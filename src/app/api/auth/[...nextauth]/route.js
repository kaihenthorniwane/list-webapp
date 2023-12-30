import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { sql } from "@vercel/postgres";

async function addFoldersAndNotes(userId) {
  // Ensure userId is provided
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Insert folders
  const myWorkspaceFolder = await sql`
        INSERT INTO folders (folder_name, user_id) VALUES ('My Workspace', ${userId})
        RETURNING folder_id;
    `;

  const randomThoughtsFolder = await sql`
        INSERT INTO folders (folder_name, user_id) VALUES ('Random Thoughts', ${userId})
        RETURNING folder_id;
    `;

  const efficientEndeavorsFolder = await sql`
      INSERT INTO folders (folder_name, user_id) VALUES ('Efficient Endeavors', ${userId})
      RETURNING folder_id;
    `;

  const productiveProjectsFolder = await sql`
    INSERT INTO folders (folder_name, user_id) VALUES ('Productive Projects', ${userId})
    RETURNING folder_id;
    `;

  // Extract folder IDs
  const myWorkspaceFolderId = myWorkspaceFolder.rows[0].folder_id;
  const randomThoughtsFolderId = randomThoughtsFolder.rows[0].folder_id;

  // Insert notes into 'My Workspace' folder
  const workspaceNotes = [
    {
      title: "Project Timeline Review",
      content: "Review and update the project timeline.",
    },
    {
      title: "Budget Analysis",
      content: "Analyze the current budget and identify savings.",
    },
    {
      title: "Team Meeting Agenda",
      content: "Prepare the agenda for the next team meeting.",
    },
  ];

  for (const note of workspaceNotes) {
    await sql`
            INSERT INTO notes (note_title, note_content, folder_id) VALUES (${note.title}, ${note.content}, ${myWorkspaceFolderId});
        `;
  }

  // Insert notes into 'Random Thoughts' folder
  const randomNotes = [
    {
      title: "Brainstorming Session",
      content: "Ideas for innovative marketing strategies.",
    },
    {
      title: "Book List",
      content: "List of must-read books for personal growth.",
    },
    {
      title: "Travel Plans",
      content: "Plan a vacation to a tropical destination.",
    },
  ];

  for (const note of randomNotes) {
    await sql`
            INSERT INTO notes (note_title, note_content, folder_id) VALUES (${note.title}, ${note.content}, ${randomThoughtsFolderId});
        `;
  }
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/folders", // The route to the sign-in page
    // Define other custom pages if necessary
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if user already exists in your database
      const match =
        await sql`SELECT * FROM users WHERE google_id = ${profile.sub}`;
      if (match.rows.length === 0) {
        // If user doesn't exist, insert new user
        await sql`INSERT INTO users (google_id, name, email) VALUES (${profile.sub}, ${user.name}, ${user.email})`;

        //add autofilled content to your account
        const dbUser =
          await sql`SELECT user_id FROM users WHERE google_id = ${profile.sub}`;

        if (dbUser.rows.length > 0) {
          // Add user_id to the session object
          await addFoldersAndNotes(dbUser.rows[0].user_id);
        }
      }

      // After adding or confirming the user, return true to continue
      return true;
    },

    async session({ session, user, token }) {
      // Fetch additional information from your database
      const dbUser =
        await sql`SELECT user_id FROM users WHERE google_id = ${token.sub}`;

      if (dbUser.rows.length > 0) {
        // Add user_id to the session object
        session.user.id = dbUser.rows[0].user_id;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    // async session({ session, user, token }) {
    //   return session;
    // },
    async jwt({ token, user, account, profile }) {
      return token;
    },
  },
  // ...other options
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
