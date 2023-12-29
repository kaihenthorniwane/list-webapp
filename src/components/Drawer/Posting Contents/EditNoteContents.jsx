import { useEffect, useRef, useState } from "react";
import { useOverlay } from "@/contexts/OverlayContext";
import { motion } from "framer-motion";
import SmoothButton from "../Smooth Button/SmoothButton";
import EditableDiv from "./Posting Components/EditableDiv";
import TextInput from "./Posting Components/TextInput";
import Drawer from "../Drawer";
import NoteOptionsContents from "../Drawer Contents/NoteOptionsContents";

export default function EditNoteContents({
  note_id,
  folder_id,
  note_title = "",
  note_content = "",
  last_saved,
  variant = "new-note",
}) {
  const { setIsOn, setOverlay } = useOverlay();
  //text states

  const [title, setTitle] = useState(note_title);
  const [content, setContent] = useState(note_content);

  const functionVariants = {
    "new-note": () => {
      setIsOn(false);
    },
    "edit-note": () => {
      setOverlay(
        <Drawer>
          <NoteOptionsContents
            note_id={note_id}
            folder_id={folder_id}
            note_title={note_title}
            note_content={note_content}
            last_saved={last_saved}
          />
        </Drawer>
      );
    },
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 ">
        <div className="w-full h-[60vh] flex">
          <div className="flex flex-col gap-3 w-full">
            <div className="font-header text-32 leading-none">
              <TextInput
                text={title}
                setText={setTitle}
                placeholder={"Write your title"}
              />
            </div>
            <TextInput
              text={content}
              setText={setContent}
              placeholder={"Write your note"}
              overflowHidden={false}
            />
          </div>
        </div>
      </div>
      <SmoothButton text="Cancel" functionToRun={functionVariants[variant]} />
    </div>
  );
}
