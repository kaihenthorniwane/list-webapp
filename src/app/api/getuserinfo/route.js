import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export const dynamic = "force-dynamic";

export async function GET(request) {
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
  const sessionUserName = session.user.name;

  try {
    const responseObject = {};
    return new Response(JSON.stringify(), {
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
