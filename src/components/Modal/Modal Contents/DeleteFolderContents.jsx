import SmoothButton from "@/components/Drawer/Smooth Button/SmoothButton";
import SmoothButtonRed from "@/components/Drawer/Smooth Button/SmoothButtonRed";
import { useOverlay } from "@/contexts/OverlayContext";
import Drawer from "@/components/Drawer/Drawer";
import NoteOptionsContents from "@/components/Drawer/Drawer Contents/NoteOptionsContents";
import { useAllNotes } from "@/contexts/AllNotesContext";
import FolderOptionsContents from "@/components/Drawer/Drawer Contents/FolderOptionsContents";

export default function DeleteFolderContents({ folder_id }) {
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
          Are you sure you want to delete this folder?
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
                <FolderOptionsContents />
              </Drawer>
            );
          }}
        />
      </div>
    </div>
  );
}
