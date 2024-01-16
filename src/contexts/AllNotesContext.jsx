import React, { createContext, useState, useContext } from "react";

// Create the context
const AllNotesContext = createContext();

// Provider component
export const AllNotesProvider = ({ children }) => {
  const [allNotesData, setallNotesData] = useState({}); // State to store notes

  // // Function to fetch notes

  // Function to fetch and sort notes
  const fetchAllNotes = async (folderId, noteOrder) => {
    // if (!allNotesData[folderId]) {
    try {
      const response = await fetch(`/api/getallnotes/${folderId}`);
      let data = await response.json();

      // Sorting based on noteOrder
      switch (noteOrder) {
        case "newest":
          data.sort((a, b) => new Date(b.last_saved) - new Date(a.last_saved));
          break;
        case "oldest":
          data.sort((a, b) => new Date(a.last_saved) - new Date(b.last_saved));
          break;
        // Add more cases for other sorting criteria here
      }

      console.log(data);

      setallNotesData((prevData) => ({ ...prevData, [folderId]: data }));
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
    // }
  };

  const addANoteAndRefreshOnscreenNotes = async (
    folder_id,
    note_title,
    note_content,
    noteOrder // Adding noteOrder parameter
  ) => {
    try {
      const objectWithData = {
        folder_id: folder_id,
        note_content: note_content,
        note_title: note_title,
      };

      const response = await fetch("/api/addanote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectWithData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // No need to parse the response here as we'll fetch all notes again
      await fetchAllNotes(folder_id, noteOrder); // Using fetchAllNotes to refresh the notes
    } catch (error) {
      console.error("Error adding a note:", error);
    }
  };

  const editANoteAndRefreshOnscreenNotes = async (
    folder_id,
    note_id,
    note_title,
    note_content,
    noteOrder // Adding noteOrder parameter
  ) => {
    try {
      const objectWithData = {
        note_id: note_id,
        note_content: note_content,
        note_title: note_title,
      };

      const response = await fetch("/api/editanote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectWithData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // No need to parse the response here as we'll fetch all notes again
      await fetchAllNotes(folder_id, noteOrder); // Using fetchAllNotes to refresh the notes
    } catch (error) {
      console.error("Error updating a note:", error);
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
