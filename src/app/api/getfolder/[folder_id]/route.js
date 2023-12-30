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
  console.log("Requested notes for folder id: " + folder_id);

  try {
    // Fetch folders
    const dbFolders =
      await sql`SELECT * FROM folders WHERE folder_id = ${folder_id}`;

    // Check if the fetched folder belongs to the authenticated user
    if (dbFolders.rows.length > 0 && dbFolders.rows[0].user_id !== user_id) {
      return new Response(
        JSON.stringify({ error: "Unauthorized user attempted to access data" }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(JSON.stringify(dbFolders.rows), {
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
