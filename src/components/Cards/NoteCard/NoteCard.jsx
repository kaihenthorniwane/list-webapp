import React, { useState } from "react";
import FolderNoteBackground from "./FolderNoteBackground";
import { motion } from "framer-motion";
import { brandedBezier } from "@/utils/animationConstants";

const noteCardName = "";

const NoteCard = ({
  note_id,
  folder_id,
  note_title,
  note_content,
  last_saved,
  variant,
}) => {
  const currentVariant = variant || "writer"; //server rendered state

  const dimensionVariantStyles = {
    writer: noteCardName + " relative",
    simple: noteCardName + " relative p-4",
    "folder-view": noteCardName + " relative h-24 p-4",
  };
  const wrapperVariantStyles = {
    writer: "flex flex-col gap-5",
    simple: "flex flex-col gap-3",
    "folder-view": "flex flex-col",
  };

  const titleVariantStyles = {
    writer: "font-header text-32 leading-none tracking-wide font-400",
    simple: "font-header text-32 leading-none tracking-wide font-400",
    "folder-view": " text-16 font-500",
  };
  const contentVariantStyles = {
    writer: "leading-tight text-18 font-300",
    simple: "leading-tight text-18 font-300 line-clamp-1",
    "folder-view": "text-12 font-300 hidden",
  };
  const lastSavedVariantStyles = {
    writer: "text-14 font-300 block leading-none",
    simple: "text-14 font-300 block leading-none",
    "folder-view": "text-12 font-300 hidden",
  };

  const noteBackground = {
    writer: undefined,
    simple: undefined,
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
    <motion.div
      layout
      transition={{
        layout: { duration: 0.3, ease: brandedBezier },
      }}
      className={
        "transition-padding duration-300 ease-fast-easing" +
        dimensionVariantStyles[currentVariant]
      }
    >
      <div className={"relative z-1 " + wrapperVariantStyles[currentVariant]}>
        <div className="flex leading-tight justify-between gap-2">
          <span className={titleVariantStyles[currentVariant]}>
            {note_title}
          </span>
          {variant === "writer" && (
            <div className="flex gap-2 flex-shrink-0 align-start">
              <img src="/svg/NoteCard/Expand Icon.svg" />
              <img src="/svg/NoteCard/MoreOptionsDots.svg" />
            </div>
          )}
        </div>
        <span className={contentVariantStyles[currentVariant]}>
          {note_content}
        </span>
        <span className={lastSavedVariantStyles[currentVariant]}>
          {formatDate(last_saved)}
        </span>
      </div>
      {noteBackground && noteBackground[currentVariant]}
    </motion.div>
  );
};

export default NoteCard;
