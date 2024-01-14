import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useEffect } from "react";

export default function SelectFolderRive({ isSelected }) {
  const { rive, RiveComponent } = useRive({
    src: "/riv/select_folder.riv",
    stateMachines: "Folder Select Icon",
    autoplay: true,
  });

  const selectedInput = useStateMachineInput(
    rive,
    "Folder Select Icon",
    "Selected"
  );

  const darkmodeInput = useStateMachineInput(
    rive,
    "Folder Select Icon",
    "Darkmode"
  );

  useEffect(() => {
    if (selectedInput) {
      selectedInput.value = isSelected;
    }
  }, [isSelected]);

  useEffect(() => {
    // Function to update dark mode based on data-theme attribute
    const updateDarkMode = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      if (darkmodeInput) {
        darkmodeInput.value = theme === "dark";
      }
    };

    // Call once to set initial state
    updateDarkMode();

    // Set up an observer to watch for changes in data-theme attribute
    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, [darkmodeInput]);

  return (
    <div style={{ width: "2rem", height: "2rem" }}>
      <RiveComponent />
    </div>
  );
}
