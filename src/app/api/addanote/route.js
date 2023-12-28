import { sql } from "@vercel/postgres";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log(data);

    await sql`INSERT INTO notes (folder_id, note_title, note_content) VALUES (${data.folder_id}, ${data.note_title}, ${data.note_content})`;

    // console.log("Number of deleted rows:", result.count);

    return new Response(
      JSON.stringify({
        message: "Note successfully created",
      }),
      {
        status: 201, // 201 Created
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
