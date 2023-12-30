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
  const note_id = params.note_id; // Assuming 'note_id' is passed in the route
  console.log("Requested to delete note id: " + note_id);

  try {
    // First, verify the note belongs to a folder owned by the authenticated user
    const noteOwnerQuery = await sql`
        SELECT folders.user_id
        FROM notes
        JOIN folders ON notes.folder_id = folders.folder_id
        WHERE notes.note_id = ${note_id}`;

    if (
      noteOwnerQuery.rows.length === 0 ||
      noteOwnerQuery.rows[0].user_id !== user_id
    ) {
      return new Response(
        JSON.stringify({ error: "Unauthorized user attempted to delete note" }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // If authorized, perform the DELETE operation
    const result = await sql`DELETE FROM notes WHERE note_id = ${note_id}`;
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
