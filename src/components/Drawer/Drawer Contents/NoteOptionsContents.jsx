import SmoothButton from "../Smooth Button/SmoothButton";
import DrawerOption from "./Drawer Components/DrawerOption";
import { useOverlay } from "@/contexts/OverlayContext";
import Drawer from "../Drawer";
import ShareNoteContents from "./ShareNoteContents";

export default function NoteOptionsContents({
  note_id,
  folder_id,
  note_title,
  note_content,
  last_saved,
}) {
  const { isOn, setIsOn, setOverlay } = useOverlay();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <DrawerOption
          iconSrc="/svg/Drawers/NoteOptionDrawer/Share Icon.svg"
          text="Share Note"
          functionToRun={() => {
            setOverlay(
              <Drawer>
                <ShareNoteContents
                  note_id={note_id}
                  folder_id={folder_id}
                  note_title={note_title}
                  note_content={note_content}
                  last_saved={last_saved}
                />
              </Drawer>
            );
          }}
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
        functionToRun={() => {
          setIsOn(!isOn);
        }}
      />
    </div>
  );
}
