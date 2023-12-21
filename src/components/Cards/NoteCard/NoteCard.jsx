import React, { useState } from "react";

const NoteCard = ({
  note_id,
  folder_id,
  note_title,
  note_content,
  last_saved,
  variant,
}) => {
  const [currentVariant, setCurrentVariant] = useState(variant || "default"); //server rendered state

  const titleVariantStyles = {
    default: "font-24 font-600",
    "folder-view": "font-14 font-700",
  };
  const contentVariantStyles = {
    default: "font-18 font-300",
    "folder-view": "font-12 font-300",
  };
  const lastSavedVariantStyles = {
    default: "font-14 font-300 block",
    "folder-view": "font-12 font-300 hidden",
  };
  const noteBackground = {
    default: "font-14 font-300 block",
    "folder-view": "font-12 font-300 hidden",
  };

  return (
    <div>
      <div>
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
    </div>
  );
};

export default NoteCard;
