import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

// Helper function to create a delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchUpdatedFolder(folder_id, folder_name, attempt = 0) {
  // Maximum number of retry attempts
  const maxAttempts = 5;

  const result = await sql`
    SELECT * FROM folders
    WHERE folder_id = ${folder_id}
  `;

  // Check if the folder name is updated or if the maximum attempts have been reached
  if (
    (result.rowCount > 0 && result.rows[0].folder_name === folder_name) ||
    attempt >= maxAttempts
  ) {
    return result.rows[0];
  } else {
    // Wait for a short delay before retrying
    await delay(1000); // Adjust this delay as needed
    return fetchUpdatedFolder(folder_id, folder_name, attempt + 1);
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

    // Verify the folder belongs to the authenticated user
    const folderOwnerQuery = await sql`
        SELECT user_id
        FROM folders
        WHERE folder_id = ${data.folder_id}`;

    if (
      folderOwnerQuery.rows.length === 0 ||
      folderOwnerQuery.rows[0].user_id !== user_id
    ) {
      return new Response(
        JSON.stringify({ error: "Unauthorized user attempted to edit folder" }),
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
      UPDATE folders 
      SET 
        folder_name = ${data.folder_name}
      WHERE folder_id = ${data.folder_id}`;

    // Fetch the updated folder with retry logic
    const updatedFolder = await fetchUpdatedFolder(
      data.folder_id,
      data.folder_name
    );

    return new Response(
      JSON.stringify({
        message: "Folder successfully updated",
        updatedFolder: updatedFolder,
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
