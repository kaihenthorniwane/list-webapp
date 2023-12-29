import { useEffect, useRef, useState } from "react";
import NoteCard from "@/components/Cards/NoteCard/NoteCard";
import { useOverlay } from "@/contexts/OverlayContext";
import { motion } from "framer-motion";
import Drawer from "../Drawer";
import NoteOptionsContents from "../Drawer Contents/NoteOptionsContents";
import SmoothButton from "../Smooth Button/SmoothButton";

export default function EditNoteContents({
  note_id,
  folder_id,
  note_title,
  note_content,
  last_saved,
}) {
  const { setIsOn } = useOverlay();

  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [constraints, setConstraints] = useState(0);

  useEffect(() => {
    const containerHeight = containerRef.current.offsetHeight;
    const contentHeight = contentRef.current.offsetHeight;

    // Calculate the maximum drag distance
    const maxDrag = contentHeight - containerHeight;
    setConstraints(maxDrag);
    console.log(maxDrag);
  }, []); // Run once after initial render

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 ">
        <motion.div
          drag="y"
          dragConstraints={{ top: constraints, bottom: 0 }}
          className="w-full h-[75vh] flex"
          ref={containerRef}
        >
          <div className="flex flex-col w-full" ref={contentRef}>
            Content goes here
          </div>
        </motion.div>
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
