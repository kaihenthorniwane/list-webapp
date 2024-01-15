import SmoothButton from "../Smooth Button/SmoothButton";
import DrawerOption from "./Drawer Components/DrawerOption";
import { useOverlay } from "@/contexts/OverlayContext";
import Drawer from "../Drawer";
import Modal from "@/components/Modal/Modal";
import TrashNoteIcon from "./Icons/TrashNoteIcon";
import RenameFolderIcon from "./Icons/RenameFolderIcon";

export default function FolderOptionsContents({ folder_id, folder_name }) {
  const { isOn, setIsOn, setOverlay } = useOverlay();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <DrawerOption
          icon={<RenameFolderIcon />}
          text="Rename Folder"
          functionToRun={() => {
            setOverlay(<Drawer>Testing</Drawer>);
          }}
        />
        <DrawerOption
          icon={<TrashNoteIcon />}
          text="Delete Folder"
          color="rgb(var(--Brand-Red))"
          functionToRun={() => {
            setOverlay(<Modal>Testing</Modal>);
          }}
        />
      </div>
      <SmoothButton
        text="Cancel"
        functionToRun={() => {
          setIsOn(!isOn);
        }}
      />
    </div>
  );
}
