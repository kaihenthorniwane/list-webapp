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

  // The value that will be supplied to any descendants of this provider
  const contextValue = {
    allNotesData,
    fetchAllNotes,
    setallNotesData,
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
