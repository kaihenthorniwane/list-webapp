import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
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

  const user_id = session.user.id;
  const folder_id = params.folder_id; // Assuming 'folder_id' is passed in the route
  console.log("Requested to delete folder id: " + folder_id);

  try {
    // First, verify the folder belongs to the authenticated user
    const folderOwnerQuery = await sql`
        SELECT user_id
        FROM folders
        WHERE folder_id = ${folder_id}`;

    if (
      folderOwnerQuery.rows.length === 0 ||
      folderOwnerQuery.rows[0].user_id !== user_id
    ) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized user attempted to delete folder",
        }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // If authorized, perform the DELETE operation
    const result =
      await sql`DELETE FROM folders WHERE folder_id = ${folder_id}`;
    console.log("Number of deleted rows:", result.rowCount);

    return new Response(
      JSON.stringify({ success: true, deletedRows: result.rowCount }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
