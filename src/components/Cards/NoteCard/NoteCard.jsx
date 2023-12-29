import React, { useState, useEffect } from "react";
import FolderNoteBackground from "./FolderNoteBackground";
import { motion } from "framer-motion";
import { brandedBezier } from "@/utils/animationConstants";
import NoteBackground from "./NoteBackground";
import MoreOptionsDots from "./Icons/MoreOptionsDots";
import { useOverlay } from "@/contexts/OverlayContext";
import Drawer from "@/components/Drawer/Drawer";
import EditNoteContents from "@/components/Drawer/Posting Contents/EditNoteContents";

const noteCardName = "";

const NoteCard = ({
  note_id,
  folder_id,
  note_title,
  note_content,
  last_saved,
  variant,
  disableDateFormatting,
}) => {
  const { isOn, setIsOn, setOverlay } = useOverlay();

  const [textBreakClass, setTextBreakClass] = useState("break-words");

  const isWordTooLong = (title, maxLength = 20) => {
    return title.split(" ").some((word) => word.length > maxLength);
  };

  useEffect(() => {
    if (isWordTooLong(note_title)) {
      setTextBreakClass("break-all ");
    } else {
      setTextBreakClass("break-words ");
    }
  }, [note_title]);

  const openEditDrawer = () => {
    setOverlay(
      <Drawer>
        <EditNoteContents
          note_id={note_id}
          folder_id={folder_id}
          note_title={note_title}
          note_content={note_content}
          last_saved={last_saved}
          variant={"direct-edit-note"}
        />
      </Drawer>
    );
    setIsOn(true);
  };

  const currentVariant = variant || "writer"; //server rendered state

  const dimensionVariantStyles = {
    writer: noteCardName + " relative",
    simple: noteCardName + " relative p-5",
    "share-view": noteCardName + " relative p-5",
    grid: noteCardName + " relative p-4 pb-10",
    "folder-view": noteCardName + " relative h-24 p-4",
  };
  const wrapperVariantStyles = {
    writer: "flex flex-col gap-5",
    simple: "flex flex-col gap-2.5",
    "share-view": "flex flex-col gap-2.5",
    grid: "flex flex-col gap-2",
    "folder-view": "flex flex-col",
  };

  const titleVariantStyles = {
    writer: "font-header text-32 leading-none tracking-wide font-400 mr-0",
    simple: "font-header text-28 leading-none tracking-wide font-400 mr-6",
    "share-view":
      "font-header text-28 leading-none tracking-wide font-400 mr-6",
    grid: "font-header text-24 leading-none tracking-wide font-400 mr-2",
    "folder-view": " text-16 font-500",
  };
  const contentVariantStyles = {
    writer: "leading-tight text-18 font-300",
    simple: "leading-tight text-18 font-300 line-clamp-1",
    "share-view": "leading-tight text-18 font-300 line-clamp-1",
    grid: "leading-tight text-14 font-300 line-clamp-3",
    "folder-view": "text-12 font-300 hidden",
  };
  const lastSavedVariantStyles = {
    writer: "text-14 font-300 leading-none block",
    simple:
      "text-14 font-300 leading-none flex w-full items-center justify-between max-h-4",
    "share-view":
      "text-14 font-300 leading-none flex w-full items-center justify-between max-h-4",
    "folder-view": "text-12 font-300 hidden",
    grid: "text-14 font-300 leading-none block",
  };

  const onClickVariantFunctions = {
    writer: () => {},
    simple: openEditDrawer,
    "share-view": () => {},
    "folder-view": () => {},
    grid: openEditDrawer,
  };

  const noteBackground = {
    writer: undefined,
    simple: <NoteBackground />,
    "share-view": <NoteBackground />,
    grid: <FolderNoteBackground />,
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
      // layout
      // transition={{
      //   layout: { duration: 0.3, ease: brandedBezier },
      // }}
      className={
        "transition-padding duration-300 ease-fast-easing overflow-wrap hyphens-auto " +
        textBreakClass +
        dimensionVariantStyles[currentVariant]
      }
      onClick={onClickVariantFunctions[currentVariant]}
    >
      <div className={"relative z-1 " + wrapperVariantStyles[currentVariant]}>
        <div className="flex leading-tight justify-between gap-2 ">
          <span className={"w-full " + titleVariantStyles[currentVariant]}>
            {note_title}
          </span>
          {variant === "writer" && (
            <div className="flex mt-1.5 gap-2 flex-shrink-0 align-start">
              <MoreOptionsDots
                note_id={note_id}
                folder_id={folder_id}
                note_title={note_title}
                note_content={note_content}
                last_saved={last_saved}
              />
            </div>
          )}
        </div>
        <span className={contentVariantStyles[currentVariant]}>
          {note_content}
        </span>
        <div className={lastSavedVariantStyles[currentVariant]}>
          {disableDateFormatting ? last_saved : formatDate(last_saved)}
          {variant === "simple" && (
            <MoreOptionsDots
              note_id={note_id}
              folder_id={folder_id}
              note_title={note_title}
              note_content={note_content}
              last_saved={last_saved}
            />
          )}
        </div>
      </div>
      {variant === "grid" && (
        <div className="absolute z-[2] left-3 bottom-1.5">
          <MoreOptionsDots
            note_id={note_id}
            folder_id={folder_id}
            note_title={note_title}
            note_content={note_content}
            last_saved={last_saved}
          />
        </div>
      )}
      {noteBackground && noteBackground[currentVariant]}
    </motion.div>
  );
};

export default NoteCard;
