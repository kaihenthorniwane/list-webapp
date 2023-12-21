import React, { useState } from "react";
import FolderNoteBackground from "./FolderNoteBackground";

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
    default: "relative",
    "folder-view": "relative h-24 p-4",
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
          {last_saved}
        </span>
      </div>
      {noteBackground && noteBackground[currentVariant]}
    </div>
  );
};

export default NoteCard;
