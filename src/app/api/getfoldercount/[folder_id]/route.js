import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

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
  const folder_id = params.folder_id;
  console.log("Requested count of notes linked to folder id: " + folder_id);

  try {
    // First, check if the folder exists and belongs to the user
    const folderCheck =
      await sql`SELECT user_id FROM folders WHERE folder_id = ${folder_id}`;

    if (
      folderCheck.rows.length === 0 ||
      folderCheck.rows[0].user_id !== user_id
    ) {
      return new Response(
        JSON.stringify({ error: "Unauthorized or non-existent folder" }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Fetch the count of notes in the specified folder
    const noteCount =
      await sql`SELECT COUNT(*) FROM notes WHERE folder_id = ${folder_id}`;

    return new Response(JSON.stringify({ count: noteCount.rows[0].count }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
