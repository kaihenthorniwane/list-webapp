import { sql } from "@vercel/postgres";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const note_id = params.note_id; // Assuming 'note_id' is passed in the route
    console.log("Requested to delete note id: " + note_id);

    // Perform a DELETE operation instead of SELECT
    const result = await sql`DELETE FROM notes WHERE note_id = ${note_id}`;

    console.log("Number of deleted rows:", result.count);
    return new Response(
      JSON.stringify({ success: true, deletedRows: result.count }),
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
