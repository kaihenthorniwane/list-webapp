import { useEffect, useRef, useState } from "react";
import { useOverlay } from "@/contexts/OverlayContext";
import { motion } from "framer-motion";
import SmoothButton from "../Smooth Button/SmoothButton";
import EditableDiv from "./Posting Components/EditableDiv";
import TextInput from "./Posting Components/TextInput";
import Drawer from "../Drawer";
import NoteOptionsContents from "../Drawer Contents/NoteOptionsContents";
import SmoothButtonBlack from "../Smooth Button/SmoothButtonBlack";
import { useAllNotes } from "@/contexts/AllNotesContext";

export default function EditNoteContents({
  note_id,
  folder_id,
  note_title = "",
  note_content = "",
  last_saved,
  variant = "new-note",
}) {
  const { setIsOn, setOverlay } = useOverlay();
  const { addANoteAndRefreshOnscreenNotes, editANoteAndRefreshOnscreenNotes } =
    useAllNotes();
  //text states

  const [title, setTitle] = useState(note_title);
  const [content, setContent] = useState(note_content);

  const saveFunctionVariant = {
    "new-note": () => {
      addANoteAndRefreshOnscreenNotes(folder_id, title, content);
      setIsOn(false);
    },
    "edit-note": () => {
      editANoteAndRefreshOnscreenNotes(folder_id, note_id, title, content);
      setIsOn(false);
    },
  };

  const cancelFunctionVariant = {
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

      <div className="flex gap-2.5">
        <SmoothButton
          text="Cancel"
          functionToRun={cancelFunctionVariant[variant]}
        />
        {title.length > 0 && content.length > 0 ? (
          <SmoothButtonBlack
            text="Save"
            functionToRun={saveFunctionVariant[variant]}
          />
        ) : (
          <div className="opacity-25 w-full">
            <SmoothButtonBlack text="Save" />
          </div>
        )}
      </div>
    </div>
  );
}
