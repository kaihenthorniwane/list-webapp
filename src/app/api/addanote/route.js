import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

// Helper function to create a delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchNotes(folder_id, attempt = 0) {
  // Maximum number of retry attempts
  const maxAttempts = 5;

  const result = await sql`
    SELECT * FROM notes
    WHERE folder_id = ${folder_id}
  `;

  // Check if the row count is as expected or if the maximum attempts have been reached
  if (result.rowCount > attempt || attempt >= maxAttempts) {
    return result;
  } else {
    // Wait for a short delay before retrying
    await delay(1000); // Adjust this delay as needed
    return fetchNotes(folder_id, attempt + 1);
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

    // First, verify the folder belongs to the authenticated user
    const folderQuery =
      await sql`SELECT user_id FROM folders WHERE folder_id = ${data.folder_id}`;

    if (
      folderQuery.rows.length === 0 ||
      folderQuery.rows[0].user_id !== user_id
    ) {
      return new Response(
        JSON.stringify({ error: "Unauthorized user attempted to add note" }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Perform the insert operation
    await sql`
      INSERT INTO notes (folder_id, note_title, note_content)
      VALUES (${data.folder_id}, ${data.note_title}, ${data.note_content})
    `;

    // Fetch notes with retry logic
    const result = await fetchNotes(data.folder_id);

    console.log(
      "Final query executed. Number of rows returned:",
      result.rowCount
    );
    console.log("Rows:", result.rows);

    return new Response(
      JSON.stringify({
        message: "Note successfully created",
        notes: result.rows,
      }),
      {
        status: 201,
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
