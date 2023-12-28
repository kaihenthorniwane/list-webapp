"use client";

import React, { useState, useContext, createContext, useEffect } from "react";

// Define the shape of the context data
const defaultOverlayState = {
  isOn: false,
  overlay: null,
  visibilityArray: [false],
  visibilityComponent: null,
  setIsOn: () => {},
  setOverlay: () => {},
  setVisibilityArray: () => {},
  setVisibilityComponent: () => {},
};

// Create the context
export const OverlayContext = createContext(defaultOverlayState);

// Custom hook for accessing the context
export const useOverlay = () => useContext(OverlayContext);

// Context Provider Component
export const OverlayProvider = ({ children }) => {
  const [isOn, setIsOn] = useState(defaultOverlayState.isOn);
  const [overlay, setOverlay] = useState(defaultOverlayState.overlay);
  const [visibilityComponent, setVisibilityComponent] = useState(
    defaultOverlayState.visibilityComponent
  );
  const [visibilityArray, setVisibilityArray] = useState(
    defaultOverlayState.visibilityArray
  );

  return (
    <OverlayContext.Provider
      value={{
        isOn,
        overlay,
        visibilityArray,
        visibilityComponent,
        setIsOn,
        setOverlay,
        setVisibilityArray,
        setVisibilityComponent,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};
