"use client";

import FolderTitle from "@/components/Navigation/FolderTitle";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SignInGoogle from "@/components/Navigation/SignInGoogle";
import FolderCard from "@/components/Cards/FolderCard";
import SignOutButton from "@/components/SignOutButton";

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
          console.log(folderData);
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
      <div className="px-5 py-5 flex flex-col">
        <FolderTitle headerText={"Folders"} crumbNameAndLinkArray={undefined} />
        {folders.map((folder, index) => (
          <FolderCard key={index} folder_id={folder.folder_id} />
        ))}
      </div>
    );
  }
}
