import React from "react";
import NoteCard from "../NoteCard/NoteCard";
import FolderBack from "./FolderBack";
import FolderFront from "./FolderFront";

const FolderCard = ({ folder_id, folder_name }) => {
  // const folderDB = await sql `SELECT * FROM folders WHERE folder_id = ${folder_id}`;
  // const folderRow = folderDB.rows[0];
  const notes = [
    {
      note_title: "Sample Note",
      note_content: "Sample Text",
      last_saved: "1 year",
    },
    {
      note_title: "Sample Note",
      note_content: "Sample Text",
      last_saved: "1 year",
    },
    {
      note_title: "Sample Note",
      note_content: "Sample Text",
      last_saved: "1 year",
    },
  ];
  return (
    <div className="flex p-5 flex-col justify-around gap-1 relative h-folder-card">
      <FolderBack />
      <div className="flex absolute z-[-2] justify-evenly left-0 right-0 bottom-28">
        {notes.map((note, index) => (
          <NoteCard
            key={index}
            note_title={note.note_title}
            note_content={note.note_content}
            last_saved={note.last_saved}
            variant={"folder-view"}
          />
        ))}
      </div>
      <FolderFront />
      <span className="relative z-0 font-header text-24 font-600">
        {folder_name}
      </span>
    </div>
  );
};

export default FolderCard;
