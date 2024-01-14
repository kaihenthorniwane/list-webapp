import React, { useState, useEffect } from "react";

const LoadingScreen = function () {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Function to check for dark mode
    const checkDarkMode = () => {
      return document.documentElement.getAttribute("data-theme") === "dark";
    };

    // Initial check for dark mode
    setIsDarkMode(checkDarkMode());

    // Set up an observer to watch for changes in data-theme attribute
    const observer = new MutationObserver(() => {
      setIsDarkMode(checkDarkMode());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  const imageSrc = isDarkMode
    ? "/gif/Loading Animation Darkmode.gif"
    : "/gif/Loading Animation.gif";

  return (
    <div className="w-screen h-screen flex justify-center flex-col items-center gap-10 text-center">
      <img width={150} height={150} src={imageSrc} />
    </div>
  );
};

export default LoadingScreen;
