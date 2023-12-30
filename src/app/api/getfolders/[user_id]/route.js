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

  const sessionUserId = session.user.id;
  const requestedUserId = params.user_id; // Assuming 'user_id' is passed in the route

  // Check if the requested user_id matches the authenticated user's id
  if (sessionUserId != requestedUserId) {
    return new Response(JSON.stringify({ error: "Unauthorized access" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  console.log("Requested folders for user id: " + requestedUserId);

  try {
    const dbFolders =
      await sql`SELECT * FROM folders WHERE user_id = ${requestedUserId}`;

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
