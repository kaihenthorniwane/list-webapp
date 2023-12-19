"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthContext({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

//so basically, for authentication with next auth you need to put this inside the root layout.js. Then, on any page you want to gatekeep, use the code in folders/page.js for instance.
//you also need something set up in api/auth/[...nextauth]/route.js, just copy the code there.
