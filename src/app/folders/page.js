"use client";

import FolderTitle from "@/components/Navigation/FolderTitle";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SignInGoogle from "@/components/Navigation/SignInGoogle";
import FolderCard from "@/components/Cards/FolderCard/FolderCard";
import { NotesProvider } from "@/contexts/NotesContext";
import LoadingScreen from "@/components/Navigation/LoadingScreen";
import { useOverlay } from "@/contexts/OverlayContext";
import NewFolderButton from "@/components/Drawer/Edit Folder Contents/NewFolderButton";
import { useFolders } from "@/contexts/FolderContext";

export default function Folders() {
  const { overlay } = useOverlay();

  const { data: session, status } = useSession();
  const { folders } = useFolders();

  if (status === "unauthenticated") {
    return <SignInGoogle />;
  } else if (status === "authenticated") {
    // If there's a session, render the folder titles
    return (
      <>
        {overlay}
        <NewFolderButton />
        <div className="flex flex-col items-center overflow-hidden">
          <div className="p-5 w-full max-w-3xl flex flex-col gap-8">
            <FolderTitle
              headerText={"Folders"}
              crumbNameAndLinkArray={undefined}
              showUserIcon={true}
            />
            <NotesProvider>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-6 gap-x-10 mb-20 md:mb-0">
                {folders.map((folder) => {
                  {
                    /* console.log("folders rendered"); */
                  }
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
      </>
    );
  } else {
    return <LoadingScreen />;
  }
}
