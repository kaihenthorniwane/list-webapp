import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

// Helper function to create a delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchUpdatedNote(
  note_id,
  note_title,
  note_content,
  attempt = 0
) {
  // Maximum number of retry attempts
  const maxAttempts = 5;

  const result = await sql`
    SELECT * FROM notes
    WHERE note_id = ${note_id}
  `;

  // Check if the note is updated or if the maximum attempts have been reached
  if (
    (result.rowCount > 0 &&
      result.rows[0].note_title === note_title &&
      result.rows[0].note_content === note_content) ||
    attempt >= maxAttempts
  ) {
    return result.rows[0];
  } else {
    // Wait for a short delay before retrying
    await delay(1000); // Adjust this delay as needed
    return fetchUpdatedNote(note_id, note_title, note_content, attempt + 1);
  }
}

export async function POST(request) {
  // Get the session
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const data = await request.json();
    const user_id = session.user.id;

    // First, verify the note belongs to a folder owned by the authenticated user
    const noteOwnerQuery = await sql`
        SELECT folders.user_id
        FROM notes
        JOIN folders ON notes.folder_id = folders.folder_id
        WHERE notes.note_id = ${data.note_id}`;

    if (
      noteOwnerQuery.rows.length === 0 ||
      noteOwnerQuery.rows[0].user_id !== user_id
    ) {
      return new Response(
        JSON.stringify({ error: "Unauthorized user attempted to edit note" }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Perform the update operation
    await sql`
      UPDATE notes 
      SET 
        note_title = ${data.note_title}, 
        note_content = ${data.note_content}
      WHERE note_id = ${data.note_id}`;

    // Fetch the updated note with retry logic
    const updatedNote = await fetchUpdatedNote(
      data.note_id,
      data.note_title,
      data.note_content
    );

    return new Response(
      JSON.stringify({
        message: "Note successfully updated",
        updatedNote: updatedNote,
      }),
      {
        status: 200, // 200 OK
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
