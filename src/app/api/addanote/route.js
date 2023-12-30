import { sql } from "@vercel/postgres";

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
  try {
    const data = await request.json();
    console.log("Received data:", data);

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
