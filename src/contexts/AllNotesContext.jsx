import React, { createContext, useState, useContext } from "react";

// Create the context
const AllNotesContext = createContext();

// Provider component
export const AllNotesProvider = ({ children }) => {
  const [allNotesData, setallNotesData] = useState({}); // State to store notes

  // Function to fetch notes
  const fetchAllNotes = async (folderId) => {
    if (!allNotesData[folderId]) {
      try {
        const response = await fetch(`/api/getallnotes/${folderId}`);
        const data = await response.json();
        setallNotesData((prevData) => ({ ...prevData, [folderId]: data }));
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }
  };

  const addANoteAndRefreshOnscreenNotes = async (
    folder_id,
    note_title,
    note_content
  ) => {
    try {
      const objectWithData = {
        folder_id: folder_id,
        note_content: note_content,
        note_title: note_title,
      };
      fetch("/api/addanote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectWithData),
      });

      const response = await fetch(`/api/getallnotes/${folder_id}`);
      const data = await response.json();
      setallNotesData((prevData) => ({ ...prevData, [folder_id]: data }));
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const editANoteAndRefreshOnscreenNotes = async (
    folder_id,
    note_id,
    note_title,
    note_content
  ) => {
    try {
      const objectWithData = {
        note_id: note_id,
        note_content: note_content,
        note_title: note_title,
      };
      fetch("/api/editanote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectWithData),
      });

      const response = await fetch(`/api/getallnotes/${folder_id}`);
      const data = await response.json();
      setallNotesData((prevData) => ({ ...prevData, [folder_id]: data }));
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // The value that will be supplied to any descendants of this provider
  const contextValue = {
    allNotesData,
    fetchAllNotes,
    setallNotesData,
    addANoteAndRefreshOnscreenNotes,
    editANoteAndRefreshOnscreenNotes,
  };

  return (
    <AllNotesContext.Provider value={contextValue}>
      {children}
    </AllNotesContext.Provider>
  );
};

// Custom hook to use the NotesContext
export const useAllNotes = () => {
  const context = useContext(AllNotesContext);
  if (!context) {
    throw new Error("useAllNotes must be used within a AllNotesProvider");
  }
  return context;
};
