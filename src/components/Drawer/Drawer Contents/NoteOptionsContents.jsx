import SmoothButton from "../Smooth Button/SmoothButton";
import DrawerOption from "./Drawer Components/DrawerOption";
import { NoteOptionsDrawerContext } from "@/components/Templates/FolderPageMobile";
import { useContext } from "react";

export default function NoteOptionsContents() {
  const { noteOptionsDrawerOn, setNoteOptionsDrawerOn } = useContext(
    NoteOptionsDrawerContext
  );
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <DrawerOption
          iconSrc="/svg/Drawers/NoteOptionDrawer/Share Icon.svg"
          text="Share Note"
        />
        <DrawerOption
          iconSrc="/svg/Drawers/NoteOptionDrawer/Move Note.svg"
          text="Move Note"
        />
        <DrawerOption
          iconSrc="/svg/Drawers/NoteOptionDrawer/Trash Icon.svg"
          text="Delete Note"
          color="rgb(var(--Brand-Red))"
        />
      </div>
      <SmoothButton
        text="Cancel"
        setContext={setNoteOptionsDrawerOn}
        valueToSet={false}
      />
    </div>
  );
}
