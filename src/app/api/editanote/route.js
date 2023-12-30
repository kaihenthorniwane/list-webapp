import { sql } from "@vercel/postgres";

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
  try {
    const data = await request.json();
    console.log("Received data:", data);

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
