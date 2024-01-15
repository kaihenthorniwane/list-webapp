import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

// Helper function to create a delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchFolders(user_id, attempt = 0) {
  // Maximum number of retry attempts
  const maxAttempts = 5;

  const result = await sql`
    SELECT * FROM folders
    WHERE user_id = ${user_id}
  `;

  // Check if the row count is as expected or if the maximum attempts have been reached
  if (result.rowCount > attempt || attempt >= maxAttempts) {
    return result;
  } else {
    // Wait for a short delay before retrying
    await delay(1000); // Adjust this delay as needed
    return fetchFolders(user_id, attempt + 1);
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

    // Perform the insert operation
    await sql`
      INSERT INTO folders (folder_name, user_id)
      VALUES (${data.folder_name}, ${user_id})
    `;

    // Fetch folders with retry logic
    const result = await fetchFolders(user_id);

    console.log(
      "Final query executed. Number of rows returned:",
      result.rowCount
    );
    console.log("Rows:", result.rows);

    return new Response(
      JSON.stringify({
        message: "Folder successfully created",
        folders: result.rows,
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
