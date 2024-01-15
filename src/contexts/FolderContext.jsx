"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";

const FolderContext = createContext();

export const useFolders = () => useContext(FolderContext);

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const { data: session, status } = useSession();
  const [foldersFetched, setFoldersFetched] = useState(false);

  const fetchFolders = async () => {
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
  };

  const addAFolderAndRefreshOnscreenFolders = async (folder_name) => {
    try {
      const objectWithData = {
        folder_name: folder_name,
      };

      const response = await fetch("/api/addafolder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectWithData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Update folders with the new set of folders
      setFolders(data.folders);
    } catch (error) {
      console.error("Error adding a folder:", error);
    }
  };

  const editAFolderAndRefreshOnscreenFolders = async (
    folder_id,
    folder_name
  ) => {
    try {
      const objectWithData = {
        folder_id: folder_id,
        folder_name: folder_name,
      };

      const response = await fetch("/api/editafolder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectWithData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Update folders with the edited folder data
      setFolders((prevFolders) =>
        prevFolders.map((folder) =>
          folder.folder_id === folder_id
            ? { ...folder, folder_name: data.updatedFolder.folder_name }
            : folder
        )
      );
    } catch (error) {
      console.error("Error updating a folder:", error);
    }
  };

  const deleteAFolder = async (folderId) => {
    try {
      await fetch(`/api/deleteafolder/${folderId}`);
      // Filter out the deleted folder from the current state
      const updatedFolders = folders.filter(
        (folder) => folder.folder_id !== folderId
      );
      setFolders(updatedFolders);
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  // Use useEffect to fetch folders when the component mounts
  useEffect(() => {
    fetchFolders();
  }, [status]);

  return (
    <FolderContext.Provider
      value={{
        folders,
        setFolders,
        addAFolderAndRefreshOnscreenFolders,
        editAFolderAndRefreshOnscreenFolders,
        deleteAFolder,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};
