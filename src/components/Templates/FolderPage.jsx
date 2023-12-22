"use client";
import React, { useState, useEffect } from "react";
import NoteCard from "@/components/Cards/NoteCard/NoteCard";
import FolderTitle from "@/components/Navigation/FolderTitle";
import { useNotes } from "@/contexts/NotesContext"; // Adjust the import path as needed

export default function FolderPage({ folder_id, folder_name }) {
  const { notesData, fetchNotes } = useNotes(); // Use the custom hook
  const notes = notesData[folder_id] || []; // Get the notes for this folder

  useEffect(() => {
    console.log("folder id: " + folder_id);
    fetchNotes(folder_id); // Fetch notes when the component mounts or folder_id changes
  }, [folder_id]);

  return (
    <div className="px-5 py-5 flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-4xl flex flex-col gap-4">
        <FolderTitle
          crumbNameAndLinkArray={[
            {
              link: "/folders",
              name: "Folders",
            },
            {
              link: "/folders/" + folder_id,
              name: folder_name,
            },
          ]}
          headerText={folder_name}
        />

        <div className="flex flex-col gap-8">
          {notes.map((note, index) => (
            <NoteCard
              key={index}
              note_title={note.note_title}
              note_content={note.note_content}
              last_saved={note.last_saved}
              variant={"default"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
