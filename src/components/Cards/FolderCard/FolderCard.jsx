import React, { useState, useEffect } from "react";
import NoteCard from "../NoteCard/NoteCard";
import FolderBack from "./FolderBack";
import FolderFront from "./FolderFront";
import { useNotes } from "@/contexts/NotesContext"; // Adjust the import path as needed

const FolderCard = ({ folder_id, folder_name }) => {
  const { notesData, fetchNotes } = useNotes(); // Use the custom hook
  const notes = notesData[folder_id] || []; // Get the notes for this folder
  const [rotationAngles, setRotationAngles] = useState({});

  useEffect(() => {
    fetchNotes(folder_id); // Fetch notes when the component mounts or folder_id changes
  }, [folder_id, fetchNotes]);

  useEffect(() => {
    // Initialize rotation angles for notes
    const newRotationAngles = {};
    notes.forEach((note, index) => {
      if (!rotationAngles[note.note_id]) {
        // Replace 'note.id' with a unique identifier for the note
        const minRotation = -7;
        const maxRotation = 7;
        newRotationAngles[note.note_id] =
          Math.random() * (maxRotation - minRotation) + minRotation;
      }
    });
    setRotationAngles((prevAngles) => ({
      ...prevAngles,
      ...newRotationAngles,
    }));
  }, [notes]);

  // Function to get the rotation for a note
  const getRotationForNote = (noteId) => {
    return `rotate(${rotationAngles[noteId]}deg)`; // Replace 'note.id' with the note's unique identifier
  };

  return (
    <div className=" flex p-5 flex-col justify-end gap-1 relative h-folder-card">
      <FolderBack />
      <div className="px-14 flex absolute z-[-2] justify-between left-0 right-0 top-7">
        {notes.map((note, index) => (
          <div
            key={index}
            className="w-4/5 -mx-12" // Set width to 2/5 (40%) and add padding for separation
            style={{ transform: getRotationForNote(note.note_id) }}
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