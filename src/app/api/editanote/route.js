import { sql } from "@vercel/postgres";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log(data);

    // Update the note in the database
    await sql`
      UPDATE notes 
      SET 
        note_title = ${data.note_title}, 
        note_content = ${data.note_content}
      WHERE note_id = ${data.note_id}`;

    return new Response(
      JSON.stringify({
        message: "Note successfully updated",
      }),
      {
        status: 200, // 200 OK
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
