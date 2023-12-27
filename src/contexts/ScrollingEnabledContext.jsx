import React, { createContext, useState, useContext } from "react";

// Create the context
const ScrollingEnabledContext = createContext();

// Provider component
export const ScrollingEnabledContextProvider = ({ children }) => {
  const [scrollingEnabled, setScrollingEnabled] = useState(); // State to store

  // The value that will be supplied to any descendants of this provider
  const contextValue = {
    scrollingEnabled,
    setScrollingEnabled,
  };

  return (
    <ScrollingEnabledContext.Provider value={contextValue}>
      {children}
    </ScrollingEnabledContext.Provider>
  );
};

// Custom hook to use the NotesContext
export const useScrollingContext = () => {
  const context = useContext(ScrollingEnabledContext);
  if (!context) {
    throw new Error(
      "useScrollingContext must be used within a ScrollingEnabledContextProvider"
    );
  }
  return context;
};
