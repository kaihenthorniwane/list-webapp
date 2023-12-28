import { sql } from "@vercel/postgres";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const note_id = params.note_id; // Assuming 'note_id' is passed in the route
    console.log("Requested note id: " + note_id);

    const dbFolders = await sql`SELECT * FROM notes WHERE note_id = ${note_id}`;

    console.log("new folders:");
    console.log(dbFolders.rows);
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
