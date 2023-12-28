import { useEffect, useRef, useState } from "react";
import NoteCard from "@/components/Cards/NoteCard/NoteCard";
import SmoothButton from "../Smooth Button/SmoothButton";
import { useOverlay } from "@/contexts/OverlayContext";
import Drawer from "../Drawer";
import NoteOptionsContents from "./NoteOptionsContents";
import ShareOption from "./Drawer Components/ShareOption";
import { motion } from "framer-motion";
import SmoothButtonBlack from "../Smooth Button/SmoothButtonBlack";

export default function MoveNoteContents({
  note_id,
  folder_id,
  note_title,
  note_content,
  last_saved,
}) {
  const { setOverlay, setIsOn } = useOverlay();

  return (
    <div className="flex flex-col gap-6">
      <span className="text-32 font-header font-400">Move this note:</span>
      <div className="flex gap-2.5">
        <SmoothButton
          text="Cancel"
          functionToRun={() => {
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
          }}
        />
        <SmoothButtonBlack
          text="Move"
          functionToRun={() => {
            setIsOn(false);
          }}
        />
      </div>
    </div>
  );
}
