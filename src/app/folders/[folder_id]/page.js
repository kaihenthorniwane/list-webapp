"use client";
import React, { useState, useEffect } from "react";
import FolderPageMobile from "@/components/Templates/FolderPageMobile";
import { useSession } from "next-auth/react";
import SignInGoogle from "@/components/Navigation/SignInGoogle";
import { AllNotesProvider } from "@/contexts/AllNotesContext";
import LoadingScreen from "@/components/Navigation/LoadingScreen";
// import SignOutButton from "@/components/SignOutButton";

export default function Folder({ params }) {
  const { data: session, status } = useSession();
  const [folderName, setFolderName] = useState([]);
  const [folderFetched, setFolderFetched] = useState(false);

  useEffect(() => {
    console.log("status changed to " + status);
    async function fetchFolders() {
      if (status === "authenticated" && !folderFetched) {
        try {
          const response = await fetch("/api/getfolder/" + params.folder_id);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const folderData = await response.json();
          setFolderName(folderData[0].folder_name);
          setFolderFetched(true);
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
      <AllNotesProvider>
        <FolderPageMobile
          folder_id={params.folder_id}
          folder_name={folderName}
        />
      </AllNotesProvider>
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
