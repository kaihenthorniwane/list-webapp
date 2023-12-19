"use client";

import FolderTitle from "@/components/Navigation/FolderTitle";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import SignOutButton from "@/components/SignOutButton";

const folderData = [
  {
    id: 0,
    folderName: "My Workspace",
  },
  {
    id: 1,
    folderName: "Random Stuff",
  },
];

export default function Folders() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    signIn("google");
    return (
      <div>
        <p>Signing you in with google. Click here if this doesn't work:</p>
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      </div>
    );
  }
  // if (status === "authenticated") {
  //   return (
  //     <div>
  //       <SignOutButton />
  //     </div>
  //   );
  // }

  // If there's a session, render the folder titles
  return (
    <div className="px-5 py-5">
      <FolderTitle headerText={"Folders"} crumbNameAndLinkArray={undefined} />
    </div>
  );
}
