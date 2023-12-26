"use client";
import React, { useState, useEffect, useRef } from "react";
import NoteCard from "@/components/Cards/NoteCard/NoteCard";
import FolderTitle from "@/components/Navigation/FolderTitle";
import { useAllNotes } from "@/contexts/AllNotesContext"; // Adjust the import path as needed
import FilterBarMobile from "../Navigation/Filter/FilterBarMobile";

export const UserSetNoteFormatContext = React.createContext();
export const AppSetNoteFormatContext = React.createContext();
export const NoteOrderContext = React.createContext();

export default function FolderPageMobile({ folder_id, folder_name }) {
  const { allNotesData, fetchAllNotes } = useAllNotes(); // Use the custom hook
  const [userSetNoteFormat, setUserSetNoteFormat] = useState("writer");
  const [appSetNoteFormat, setAppSetNoteFormat] = useState("writer");
  const [noteOrder, setNoteOrder] = useState("newest");
  const notes = allNotesData[folder_id] || []; // Get the notes for this folder
  const notesContainerDivRef = useRef(null);
  const targetElementRef = useRef(null);

  //define top bounds
  const remToPixels = (rem) =>
    rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  const paddingForScrollAdjustment = remToPixels(10);

  useEffect(() => {
    if (notesContainerDivRef.current) {
      const existingNotes = notesContainerDivRef.current.children;
      for (const note of existingNotes) {
        const boundingBox = note.getBoundingClientRect();
        if (boundingBox.top >= paddingForScrollAdjustment) {
          targetElementRef.current = note; // Set target element ref
          console.log(note); // Log the child element
          setAppSetNoteFormat(userSetNoteFormat);

          const initialTop =
            targetElementRef.current.getBoundingClientRect().top;
          console.log("initial position y: " + initialTop);

          let animationFrameId;

          const adjustScroll = () => {
            const currentTop =
              targetElementRef.current.getBoundingClientRect().top;
            const diff = currentTop - initialTop;
            if (Math.abs(diff) > 1) {
              console.log("diff of " + diff);
              window.scrollBy(0, diff);
              animationFrameId = requestAnimationFrame(adjustScroll);
            }
          };

          animationFrameId = requestAnimationFrame(adjustScroll);

          const cleanup = () => {
            console.log(
              "final element position: " +
                targetElementRef.current.getBoundingClientRect().top
            );
            cancelAnimationFrame(animationFrameId);
          };

          setTimeout(cleanup, 500);

          return cleanup;
        }
      }
    }
  }, [userSetNoteFormat]);

  useEffect(() => {
    console.log("folder id: " + folder_id);
    fetchAllNotes(folder_id); // Fetch notes when the component mounts or folder_id changes
  }, [folder_id]);

  const wrapperVariantStyles = {
    writer: "flex flex-col gap-8",
    simple: "flex flex-col gap-4",
    grid: "grid grid-cols-2 gap-4",
  };

  return (
    <NoteOrderContext.Provider value={{ noteOrder, setNoteOrder }}>
      <AppSetNoteFormatContext.Provider
        value={{ appSetNoteFormat, setAppSetNoteFormat }}
      >
        <UserSetNoteFormatContext.Provider
          value={{ userSetNoteFormat, setUserSetNoteFormat }}
        >
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

            <div
              className={
                "max-w-4xl w-full px-5 pb-5 " +
                wrapperVariantStyles[appSetNoteFormat]
              }
              ref={notesContainerDivRef}
            >
              {notes.map((note, index) => (
                <NoteCard
                  key={index}
                  note_title={note.note_title}
                  note_content={note.note_content}
                  last_saved={note.last_saved}
                  variant={appSetNoteFormat}
                />
              ))}
            </div>
          </div>
        </UserSetNoteFormatContext.Provider>
      </AppSetNoteFormatContext.Provider>
    </NoteOrderContext.Provider>
  );
}
