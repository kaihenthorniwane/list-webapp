import React, { useState, useEffect } from "react";
import NoteCard from "../NoteCard/NoteCard";
import FolderBack from "./FolderBack";
import FolderFront from "./FolderFront";

const FolderCard = ({ folder_id, folder_name }) => {
  // const folderDB = await sql `SELECT * FROM folders WHERE folder_id = ${folder_id}`;
  // const folderRow = folderDB.rows[0];
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`/api/getnotes/${folder_id}`);
        const data = await response.json();
        console.log(data);
        const trimmedNotes = data.map((note) => ({
          ...note,
          note_content: trimContent(note.note_content, 20),
        }));
        setNotes(trimmedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [folder_id]);

  const trimContent = (content, maxLength) => {
    return content.length > maxLength
      ? content.substring(0, maxLength) + "..."
      : content;
  };

  // Function to generate a random rotation value
  const getRandomRotation = () => {
    const minRotation = -7; // Minimum rotation in degrees
    const maxRotation = 7; // Maximum rotation in degrees
    const randomRotation =
      Math.random() * (maxRotation - minRotation) + minRotation;
    return `rotate(${randomRotation}deg)`; // Apply rotation in degrees
  };

  return (
    <div className=" flex p-5 flex-col justify-end gap-1 relative h-folder-card">
      <FolderBack />
      <div className="px-14 flex absolute z-[-2] justify-between left-0 right-0 top-7">
        {notes.map((note, index) => (
          <div
            key={index}
            className="w-4/5 -mx-12" // Set width to 2/5 (40%) and add padding for separation
            style={{ transform: getRandomRotation() }}
          >
            <NoteCard
              note_title={note.note_title}
              note_content={note.note_content}
              last_saved={note.last_saved}
              variant={"folder-view"}
            />
          </div>
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
