import React, { createContext, useState, useContext } from "react";

// Create the context
const NotesContext = createContext();

// Provider component
export const NotesProvider = ({ children }) => {
  const [notesData, setNotesData] = useState({}); // State to store notes

  // Function to fetch notes
  const fetchNotes = async (folderId) => {
    if (!notesData[folderId]) {
      try {
        const response = await fetch(`/api/getnotes/${folderId}`);
        const data = await response.json();
        setNotesData((prevData) => ({ ...prevData, [folderId]: data }));
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }
  };

  // The value that will be supplied to any descendants of this provider
  const contextValue = {
    notesData,
    fetchNotes,
  };

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};

// Custom hook to use the NotesContext
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
