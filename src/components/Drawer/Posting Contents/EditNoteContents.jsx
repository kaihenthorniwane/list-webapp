import { useEffect, useRef, useState } from "react";
import { useOverlay } from "@/contexts/OverlayContext";
import { motion } from "framer-motion";
import SmoothButton from "../Smooth Button/SmoothButton";
import EditableDiv from "./Posting Components/EditableDiv";
import TextInput from "./Posting Components/TextInput";

export default function EditNoteContents({
  note_id,
  folder_id,
  note_title = "",
  note_content = "",
  last_saved,
}) {
  const { setIsOn } = useOverlay();
  //text states

  const [title, setTitle] = useState(note_title);
  const [content, setContent] = useState(note_content);

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
      <SmoothButton
        text="Cancel"
        functionToRun={() => {
          setIsOn(false);
        }}
      />
    </div>
  );
}
