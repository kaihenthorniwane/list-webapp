import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

export const ThemeButton = () => {
  // Detects the preferred theme before component mounts
  const detectInitialTheme = () => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        return storedTheme;
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "dark";
      }
    }
    return "light";
  };

  const initialTheme = detectInitialTheme();
  const { theme, setTheme } = useTheme(initialTheme);
  const [mounted, setMounted] = useState(false);

  const { rive, RiveComponent } = useRive({
    src: "/riv/darkmode_switch.riv",
    stateMachines: "Darkmode Switch",
    autoplay: true,
  });

  const darkmodeInput = useStateMachineInput(
    rive,
    "Darkmode Switch",
    "Darkmode"
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (darkmodeInput) {
      darkmodeInput.value = theme === "dark";
    }
  }, [theme, darkmodeInput]);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="h-10 w-10"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <RiveComponent />
    </button>
  );
};
