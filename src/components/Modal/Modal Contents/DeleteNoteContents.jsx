import SmoothButton from "@/components/Drawer/Smooth Button/SmoothButton";
import SmoothButtonRed from "@/components/Drawer/Smooth Button/SmoothButtonRed";
import { useOverlay } from "@/contexts/OverlayContext";
import Drawer from "@/components/Drawer/Drawer";
import NoteOptionsContents from "@/components/Drawer/Drawer Contents/NoteOptionsContents";
import { useAllNotes } from "@/contexts/AllNotesContext";

export default function DeleteNoteContents({
  note_id,
  folder_id,
  note_title,
  note_content,
  last_saved,
}) {
  const { isOn, setIsOn, setOverlay } = useOverlay();
  const { allNotesData, setallNotesData } = useAllNotes();

  // Function to fetch notes
  const deleteANote = (noteId) => {
    try {
      fetch(`/api/deleteanote/${noteId}`);
      console.log(allNotesData);
      const firstKey = Object.keys(allNotesData)[0];
      const arrayNotes = allNotesData[firstKey];

      const newNotesObj = {
        [firstKey]: arrayNotes.filter((curNote) => noteId !== curNote.note_id),
      };

      console.log(newNotesObj);
      setallNotesData(newNotesObj);
      setIsOn(false);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <span className="font-header text-32 font-500 leading-none">
          Are you sure you want to delete this note?
        </span>
        You cannot undo this.
      </div>
      <div className="flex flex-col gap-3">
        <SmoothButtonRed
          text="Delete"
          functionToRun={() => {
            deleteANote(note_id);
          }}
        />
        <SmoothButton
          text="Cancel"
          functionToRun={() => {
            setOverlay(
              <Drawer>
                <NoteOptionsContents
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
      </div>
    </div>
  );
}
