import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// Opt out of caching for all data requests in the route segment
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
  console.log("Requested notes for folder id: " + folder_id);

  try {
    // First, verify the folder belongs to the authenticated user
    const folderQuery =
      await sql`SELECT user_id FROM folders WHERE folder_id = ${folder_id}`;

    if (
      folderQuery.rows.length === 0 ||
      folderQuery.rows[0].user_id !== user_id
    ) {
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

    // If authorized, fetch up to 3 notes in the folder
    const dbNotes =
      await sql`SELECT * FROM notes WHERE folder_id = ${folder_id} LIMIT 3`;

    return new Response(JSON.stringify(dbNotes.rows), {
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
