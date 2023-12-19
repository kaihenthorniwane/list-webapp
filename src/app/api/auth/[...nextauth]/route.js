import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { sql } from "@vercel/postgres";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/sign-in", // The route to the sign-in page
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
        session.userId = dbUser.rows[0].user_id;
      }

      console.log("userid is " + session.userId);

      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    // async session({ session, user, token }) {
    //   return session;
    // },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
  // ...other options
});

export { handler as GET, handler as POST };
