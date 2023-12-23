"use client";
import React, { useState, useEffect } from "react";
import NoteCard from "@/components/Cards/NoteCard/NoteCard";
import FolderTitle from "@/components/Navigation/FolderTitle";
import { useAllNotes } from "@/contexts/AllNotesContext"; // Adjust the import path as needed
import FilterBarMobile from "../Navigation/FilterBarMobile";

export default function FolderPageMobile({ folder_id, folder_name }) {
  const { allNotesData, fetchAllNotes } = useAllNotes(); // Use the custom hook
  const notes = allNotesData[folder_id] || []; // Get the notes for this folder

  useEffect(() => {
    console.log("folder id: " + folder_id);
    fetchAllNotes(folder_id); // Fetch notes when the component mounts or folder_id changes
  }, [folder_id]);

  return (
    <div className=" flex flex-col items-center">
      <div className="px-5 pt-5 w-full max-w-4xl">
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
      </div>

      <FilterBarMobile />

      <div className="max-w-4xl w-full px-5 pb-5 flex flex-col gap-8">
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
  );
}
