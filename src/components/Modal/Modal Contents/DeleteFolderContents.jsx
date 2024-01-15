import SmoothButton from "@/components/Drawer/Smooth Button/SmoothButton";
import SmoothButtonRed from "@/components/Drawer/Smooth Button/SmoothButtonRed";
import { useOverlay } from "@/contexts/OverlayContext";
import Drawer from "@/components/Drawer/Drawer";
import NoteOptionsContents from "@/components/Drawer/Drawer Contents/NoteOptionsContents";
import { useAllNotes } from "@/contexts/AllNotesContext";
import FolderOptionsContents from "@/components/Drawer/Drawer Contents/FolderOptionsContents";
import { useFolders } from "@/contexts/FolderContext";

export default function DeleteFolderContents({ folder_id, folder_name }) {
  const { setOverlay, setIsOn } = useOverlay();
  const { deleteAFolder } = useFolders();

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
            deleteAFolder(folder_id);
            setIsOn(false);
          }}
        />
        <SmoothButton
          text="Cancel"
          functionToRun={() => {
            setOverlay(
              <Drawer>
                <FolderOptionsContents
                  folder_id={folder_id}
                  folder_name={folder_name}
                />
              </Drawer>
            );
          }}
        />
      </div>
    </div>
  );
}
