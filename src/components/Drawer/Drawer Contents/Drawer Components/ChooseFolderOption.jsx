import SelectFolderRive from "./SelectFolderRive";
import MoveNoteContents from "../MoveNoteContents";

export default function ChooseFolderOption({
  text,
  folder_id,
  note_id,
  chosenFolder,
  setChosenFolder,
}) {
  return (
    <div
      className="flex items-center gap-2.5 cursor-pointer"
      onClick={() => {
        setChosenFolder(folder_id);
      }}
    >
      <SelectFolderRive isSelected={folder_id == chosenFolder} />
      <span className={"mt-1.5 " + (folder_id == chosenFolder && "font-600")}>
        {text}
      </span>
    </div>
  );
}
