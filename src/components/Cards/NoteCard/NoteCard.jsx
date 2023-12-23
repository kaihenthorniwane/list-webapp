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
  const wrapperVariantStyles = {
    default: "flex flex-col gap-3",
    "folder-view": "flex flex-col",
  };

  const titleVariantStyles = {
    default: "font-header text-28 font-600",
    "folder-view": " text-16 font-600",
  };
  const contentVariantStyles = {
    default: "leading-tight text-18 font-300",
    "folder-view": "text-12 font-300 hidden",
  };
  const lastSavedVariantStyles = {
    default: "text-14 font-300 block",
    "folder-view": "text-12 font-300 hidden",
  };
  const noteBackground = {
    default: undefined,
    "folder-view": <FolderNoteBackground />,
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const differenceInSeconds = Math.abs(now - date) / 1000; // converting milliseconds to seconds
    const differenceInMinutes = differenceInSeconds / 60; // converting seconds to minutes
    const differenceInHours = differenceInMinutes / 60; // converting minutes to hours

    if (differenceInHours < 1) {
      if (differenceInMinutes < 1) {
        return `${Math.floor(differenceInSeconds)} seconds ago`;
      } else {
        return `${Math.floor(differenceInMinutes)} minutes ago`;
      }
    } else if (differenceInHours < 24) {
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
      <div className={"relative z-1 " + wrapperVariantStyles[currentVariant]}>
        <div className="flex leading-tight gap-2">
          <span className={"w-full " + titleVariantStyles[currentVariant]}>
            {note_title}
          </span>
          <img src="/svg/NoteCard/Expand Icon.svg" />
          <img src="/svg/NoteCard/MoreOptionsDots.svg" />
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
