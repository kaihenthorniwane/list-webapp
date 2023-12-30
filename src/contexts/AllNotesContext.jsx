import React, { createContext, useState, useContext } from "react";

// Create the context
const AllNotesContext = createContext();

// Provider component
export const AllNotesProvider = ({ children }) => {
  const [allNotesData, setallNotesData] = useState({}); // State to store notes

  // // Function to fetch notes

  // Function to fetch and sort notes
  const fetchAllNotes = async (folderId, noteOrder) => {
    if (!allNotesData[folderId]) {
      try {
        const response = await fetch(`/api/getallnotes/${folderId}`);
        let data = await response.json();

        // Sorting based on noteOrder
        switch (noteOrder) {
          case "newest":
            data.sort(
              (a, b) => new Date(b.last_saved) - new Date(a.last_saved)
            );
            break;
          case "oldest":
            data.sort(
              (a, b) => new Date(a.last_saved) - new Date(b.last_saved)
            );
            break;
          // Add more cases for other sorting criteria here
        }

        console.log(data);

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

      const data = await response.json();

      console.log(data);

      // Update allNotesData with the new data
      setallNotesData((prevData) => ({ ...prevData, [folder_id]: data.notes }));
    } catch (error) {
      console.error("Error adding a note:", error);
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

      const data = await response.json();

      // Update allNotesData with the new note data
      setallNotesData((prevData) => {
        const updatedNotes = prevData[folder_id].map((note) =>
          note.note_id === note_id ? data.updatedNote : note
        );
        return { ...prevData, [folder_id]: updatedNotes };
      });
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
