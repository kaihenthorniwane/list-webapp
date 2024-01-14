import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

export const ThemeButton = () => {
  const { rive, RiveComponent } = useRive({
    src: "/riv/darkmode_switch.riv",
    stateMachines: "Darkmode Switch",
    autoplay: true,
  });

  const darkmodeInput = useStateMachineInput(
    rive,
    "Darkmode Switch",
    "Darkmode" // Replace with the actual name of the input in your Rive file
  );

  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Update the mounted state once the theme is resolved
  useEffect(() => {
    if (resolvedTheme) {
      setMounted(true);
    }
  }, [resolvedTheme]);

  // Update Rive's darkmode input whenever the theme changes
  useEffect(() => {
    if (darkmodeInput && theme) {
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
