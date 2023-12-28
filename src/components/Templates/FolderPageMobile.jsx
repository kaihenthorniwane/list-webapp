"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import NoteCard from "@/components/Cards/NoteCard/NoteCard";
import FolderTitle from "@/components/Navigation/FolderTitle";
import { useAllNotes } from "@/contexts/AllNotesContext"; // Adjust the import path as needed
import FilterBarMobile from "../Navigation/Filter/FilterBarMobile";
import { useOverlay } from "@/contexts/OverlayContext";

export const UserSetNoteFormatContext = React.createContext();
export const AppSetNoteFormatContext = React.createContext();
export const NoteOrderContext = React.createContext();
export const OverlayContext = React.createContext();
export const ScrollingEnabledContext = React.createContext();

export default function FolderPageMobile({ folder_id, folder_name }) {
  const { allNotesData, fetchAllNotes } = useAllNotes(); // Use the custom hook
  const [userSetNoteFormat, setUserSetNoteFormat] = useState("writer");
  const [appSetNoteFormat, setAppSetNoteFormat] = useState("writer");
  const [noteOrder, setNoteOrder] = useState("newest");

  const { isOn, overlay } = useOverlay();

  const [scrollingEnabled, setScrollingEnabled] = useState(true);
  const notes = allNotesData[folder_id] || []; // Get the notes for this folder
  const notesContainerDivRef = useRef(null);
  const targetElementRef = useRef(null);

  //define top bounds
  const remToPixels = (rem) =>
    rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  const paddingForScrollAdjustment = remToPixels(8);

  //scrolling function for note layout change
  useEffect(() => {
    if (notesContainerDivRef.current) {
      const existingNotes = notesContainerDivRef.current.children;
      for (const note of existingNotes) {
        const boundingBox = note.getBoundingClientRect();
        if (boundingBox.top >= paddingForScrollAdjustment) {
          targetElementRef.current = note;
          console.log(note);

          const initialTop =
            targetElementRef.current.getBoundingClientRect().top;
          console.log("initial position y: " + initialTop);

          setAppSetNoteFormat(userSetNoteFormat);

          // Delay before starting the smooth scroll
          const delayBeforeScroll = 300; // in milliseconds

          setTimeout(() => {
            const finalTop =
              targetElementRef.current.getBoundingClientRect().top;
            const scrollDistance = finalTop - initialTop;

            // Smooth scroll to the new position
            window.scrollTo({
              top: window.scrollY + scrollDistance,
              behavior: "smooth",
            });
          }, delayBeforeScroll);

          // Clean up function
          const cleanup = () => {
            console.log("Scrolling completed");
          };

          return cleanup;
        }
      }
    }
  }, [userSetNoteFormat]);

  //function to fetch notes
  useEffect(() => {
    console.log("folder id: " + folder_id);
    fetchAllNotes(folder_id); // Fetch notes when the component mounts or folder_id changes
  }, [folder_id]);

  useEffect(() => {
    console.log("-------");
    console.log("-------");
    console.log("FolderPageMobile here. I see isOn as: ", isOn);
  }, [overlay]);

  //variant styles for wrapper
  const wrapperVariantStyles = {
    writer: "flex flex-col gap-8",
    simple: "flex flex-col gap-4",
    grid: "grid grid-cols-2 gap-4",
  };

  return (
    <ScrollingEnabledContext.Provider
      value={{ scrollingEnabled, setScrollingEnabled }}
    >
      <NoteOrderContext.Provider value={{ noteOrder, setNoteOrder }}>
        <AppSetNoteFormatContext.Provider
          value={{ appSetNoteFormat, setAppSetNoteFormat }}
        >
          <UserSetNoteFormatContext.Provider
            value={{ userSetNoteFormat, setUserSetNoteFormat }}
          >
            {overlay}
            <div className="relative flex flex-col items-center ">
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
    </ScrollingEnabledContext.Provider>
  );
}
