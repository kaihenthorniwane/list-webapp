"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

export default function NextThemeProvider({ children, ...props }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // When the component mounts, set 'mounted' to true
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a placeholder/loading component until the theme is applied
  }

  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
