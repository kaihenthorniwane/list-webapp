"use client";

import FolderTitle from "@/components/Navigation/FolderTitle";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SignInGoogle from "@/components/Navigation/SignInGoogle";
import FolderCard from "@/components/Cards/FolderCard/FolderCard";
import { NotesProvider } from "@/contexts/NotesContext";
// import SignOutButton from "@/components/SignOutButton";

export default function Folders() {
  const { data: session, status } = useSession();
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    async function fetchFolders() {
      if (status === "authenticated") {
        try {
          const response = await fetch("/api/folders/" + session.userId);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const folderData = await response.json();
          setFolders(folderData);
        } catch (error) {
          setFolders([{ folder_id: "folder did not render" }]);
          console.error("Failed to fetch folders:", error.message);
        }
      }
    }

    fetchFolders();
  }, [status]);

  if (status === "unauthenticated") {
    return <SignInGoogle />;
  } else {
    // If there's a session, render the folder titles

    return (
      <div className="px-5 py-5 flex flex-col items-center overflow-hidden">
        <div className="w-full max-w-4xl flex flex-col gap-4">
          <FolderTitle
            headerText={"Folders"}
            crumbNameAndLinkArray={undefined}
          />
          <NotesProvider>
            {/* Wrap the FolderCard components with NotesProvider */}
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-5 gap-x-10">
              {folders.map((folder, index) => (
                <FolderCard
                  key={index}
                  folder_id={folder.folder_id}
                  folder_name={folder.folder_name}
                />
              ))}
            </div>
          </NotesProvider>
        </div>
      </div>
    );
  }
}

// if (status === "authenticated") {
//   return (
//     <div>
//       <SignOutButton />
//     </div>
//   );
// }
