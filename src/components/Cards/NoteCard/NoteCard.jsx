import React, { useState } from "react";
import FolderNoteBackground from "./FolderNoteBackground";

const noteCardName = "";

const NoteCard = ({
  note_id,
  folder_id,
  note_title,
  note_content,
  last_saved,
  variant,
}) => {
  const [currentVariant, setCurrentVariant] = useState(variant || "default"); //server rendered state

  const dimensionVariantStyles = {
    default: noteCardName + " relative",
    "folder-view": noteCardName + " relative h-24 p-4",
  };
  const titleVariantStyles = {
    default: "font-24 font-600",
    "folder-view": "font-14 font-600",
  };
  const contentVariantStyles = {
    default: "font-18 font-300",
    "folder-view": "font-12 font-300 hidden",
  };
  const lastSavedVariantStyles = {
    default: "font-14 font-300 block",
    "folder-view": "font-12 font-300 hidden",
  };
  const noteBackground = {
    default: undefined,
    "folder-view": <FolderNoteBackground />,
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const differenceInHours = Math.abs(now - date) / 36e5; // 36e5 is the scientific notation for 60*60*1000, converting milliseconds to hours

    if (differenceInHours < 24) {
      return `${Math.floor(differenceInHours)} hours ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  }

  return (
    <div className={dimensionVariantStyles[currentVariant]}>
      <div className="relative z-1">
        <div>
          <span className={titleVariantStyles[currentVariant]}>
            {note_title}
          </span>
        </div>
        <span className={contentVariantStyles[currentVariant]}>
          {note_content}
        </span>
        <span className={lastSavedVariantStyles[currentVariant]}>
          {formatDate(last_saved)}
        </span>
      </div>
      {noteBackground && noteBackground[currentVariant]}
    </div>
  );
};

export default NoteCard;
