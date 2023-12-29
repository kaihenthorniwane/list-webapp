import { useEffect, useRef, useState } from "react";
import NoteCard from "@/components/Cards/NoteCard/NoteCard";
import SmoothButton from "../Smooth Button/SmoothButton";
import { useOverlay } from "@/contexts/OverlayContext";
import Drawer from "../Drawer";
import NoteOptionsContents from "./NoteOptionsContents";
import ShareOption from "./Drawer Components/ShareOption";
import { motion } from "framer-motion";

export default function ShareNoteContents({
  note_id,
  folder_id,
  note_title,
  note_content,
  last_saved,
}) {
  const { setOverlay } = useOverlay();

  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [constraints, setConstraints] = useState(0);

  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = contentRef.current.offsetWidth;

    // Calculate the maximum drag distance
    const maxDrag = contentWidth - containerWidth;
    setConstraints(-maxDrag);
    console.log(maxDrag);
  }, []); // Run once after initial render

  // Function to save note as a .txt file
  const saveAsTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([note_title + "\n\n" + note_content], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${note_title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Function to copy note content to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(note_title + "\n\n" + note_content)
      .then(() => console.log("Text copied to clipboard"))
      .catch((err) => console.error("Could not copy text: ", err));
  };

  // Function to open email client with note content
  const openEmail = () => {
    const subject = encodeURIComponent(note_title);
    const body = encodeURIComponent(note_content);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  // Function to share on Twitter
  const shareOnTwitter = () => {
    const tweet = encodeURIComponent(
      `Check out my note: ${note_title} - ${note_content}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`);
  };

  // Function to share on Facebook
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        document.location.href
      )}`
    );
  };

  // Share options with corresponding functions
  const shareOptions = [
    {
      text: "Save",
      iconSrc: "/svg/Drawers/ShareDrawer/Save Icon.svg",
      functionToRun: saveAsTxt,
    },
    {
      text: "Copy",
      iconSrc: "/svg/Drawers/ShareDrawer/Copy Text Icon.svg",
      functionToRun: copyToClipboard,
    },
    {
      text: "Email",
      iconSrc: "/svg/Drawers/ShareDrawer/Mail Icon.svg",
      functionToRun: openEmail,
    },
    {
      text: "X.com",
      iconSrc: "/svg/Drawers/ShareDrawer/Xcom Icon.svg",
      functionToRun: shareOnTwitter,
    },
    {
      text: "Facebook",
      iconSrc: "/svg/Drawers/ShareDrawer/Facebook Icon.svg",
      functionToRun: shareOnFacebook,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="relative z-[1]">
        <NoteCard
          note_id={note_id}
          folder_id={folder_id}
          note_title={note_title}
          note_content={note_content}
          last_saved={last_saved}
          variant="share-view"
        />
      </div>
      <div className="flex flex-col gap-3 ">
        <span className="text-32 font-header font-400">Share this note:</span>
        <motion.div
          drag="x"
          dragConstraints={{ left: constraints, right: 0 }}
          className="w-full flex"
          ref={containerRef}
        >
          <div className="inline-flex gap-4 flex-shrink-0" ref={contentRef}>
            {shareOptions.map((option, index) => (
              <ShareOption
                key={index}
                text={option.text}
                iconSrc={option.iconSrc}
                functionToRun={option.functionToRun}
              />
            ))}
          </div>
        </motion.div>
      </div>
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
    </div>
  );
}
