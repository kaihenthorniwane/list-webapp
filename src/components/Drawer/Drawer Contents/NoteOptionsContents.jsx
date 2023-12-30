import SmoothButton from "../Smooth Button/SmoothButton";
import DrawerOption from "./Drawer Components/DrawerOption";
import { useOverlay } from "@/contexts/OverlayContext";
import Drawer from "../Drawer";
import ShareNoteContents from "./ShareNoteContents";
import Modal from "@/components/Modal/Modal";
import DeleteNoteContents from "@/components/Modal/Modal Contents/DeleteNoteContents";
import MoveNoteContents from "./MoveNoteContents";
import EditNoteContents from "../Posting Contents/EditNoteContents";
import ShareNoteIcon from "./Icons/ShareNoteIcon";
import MoveNoteIcon from "./Icons/MoveNoteIcon";
import EditNoteIcon from "./Icons/EditNoteIcon";
import TrashNoteIcon from "./Icons/TrashNoteIcon";
import NoteCard from "@/components/Cards/NoteCard/NoteCard";

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
      <NoteCard
        note_id={note_id}
        folder_id={folder_id}
        note_title={note_title}
        note_content={note_content}
        last_saved={last_saved}
        variant="share-view"
      />
      <div className="flex flex-col gap-3">
        <DrawerOption
          icon={<ShareNoteIcon />}
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
          icon={<MoveNoteIcon />}
          text="Move Note"
          functionToRun={() => {
            setOverlay(
              <Drawer>
                <MoveNoteContents
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
          icon={<EditNoteIcon />}
          text="Edit Note"
          functionToRun={() => {
            setOverlay(
              <Drawer>
                <EditNoteContents
                  note_id={note_id}
                  folder_id={folder_id}
                  note_title={note_title}
                  note_content={note_content}
                  last_saved={last_saved}
                  variant={"edit-note"}
                />
              </Drawer>
            );
          }}
        />
        <DrawerOption
          icon={<TrashNoteIcon />}
          text="Delete Note"
          color="rgb(var(--Brand-Red))"
          functionToRun={() => {
            setOverlay(
              <Modal>
                <DeleteNoteContents
                  note_id={note_id}
                  folder_id={folder_id}
                  note_title={note_title}
                  note_content={note_content}
                  last_saved={last_saved}
                />
              </Modal>
            );
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
