"use client";

import FolderTitle from "@/components/Navigation/FolderTitle";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SignInGoogle from "@/components/Navigation/SignInGoogle";
import FolderCard from "@/components/Cards/FolderCard/FolderCard";
import { NotesProvider } from "@/contexts/NotesContext";
import LoadingScreen from "@/components/Navigation/LoadingScreen";
// import SignOutButton from "@/components/SignOutButton";

export default function Folders() {
  const { data: session, status } = useSession();
  const [folders, setFolders] = useState([]);
  const [foldersFetched, setFoldersFetched] = useState(false);

  useEffect(() => {
    console.log("status changed to " + status);
    async function fetchFolders() {
      if (status === "authenticated" && !foldersFetched) {
        try {
          const response = await fetch("/api/getfolders/" + session.user.id);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const folderData = await response.json();
          setFolders(folderData);
          setFoldersFetched(true);
        } catch (error) {
          console.error("Failed to fetch folders:", error.message);
        }
      }
    }

    fetchFolders();
  }, [status]);

  if (status === "unauthenticated") {
    return <SignInGoogle />;
  } else if (status === "authenticated") {
    // If there's a session, render the folder titles
    return (
      <div className="flex flex-col items-center overflow-hidden">
        <div className="p-5 w-full max-w-3xl flex flex-col gap-8">
          <FolderTitle
            headerText={"Folders"}
            crumbNameAndLinkArray={undefined}
          />
          <NotesProvider>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-6 gap-x-10">
              {folders.map((folder) => {
                console.log("folders rendered");
                return (
                  <FolderCard
                    key={folder.folder_id}
                    folder_id={folder.folder_id}
                    folder_name={folder.folder_name}
                  />
                );
              })}
            </div>
          </NotesProvider>
        </div>
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
}

// if (status === "authenticated") {
//   return (
//     <div>
//       <SignOutButton />
//     </div>
//   );
// }
