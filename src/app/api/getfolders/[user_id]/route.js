import { sql } from "@vercel/postgres";
import { getSession } from "next-auth/react";

export async function GET(request, { params }) {
  // Get the session
  const session = await getSession(request);

  console.log("this is the session:");
  console.log(session);

  // Check if the user is authenticated
  // if (!session) {
  //   return new Response(JSON.stringify({ error: "Unauthorized" }), {
  //     status: 401,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }

  // If authenticated, fetch folders
  try {
    const user_id = params.user_id; // Assuming 'user_id' is passed in the route
    console.log("Requested folders for user id: " + user_id);

    const dbFolders =
      await sql`SELECT * FROM folders WHERE user_id = ${user_id}`;

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
