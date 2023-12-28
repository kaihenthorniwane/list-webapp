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

  useEffect(() => {
    if (selectedInput) {
      selectedInput.value = isSelected;
    }
  }, [isSelected]);

  return (
    <div style={{ width: "2rem", height: "2rem" }}>
      <RiveComponent />
    </div>
  );
}
