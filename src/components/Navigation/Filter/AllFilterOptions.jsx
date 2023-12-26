import React, { useState, useContext, useEffect, useRef } from "react";
import FilterOptionsGroup from "./FilterOptionsGroup";
import MenuGridIcon from "./Icons/MenuGridIcon";
import MenuSimpleIcon from "./Icons/MenuSimpleIcon";
import MenuWriterIcon from "./Icons/MenuWriterIcon";
import { DropDownStateContext } from "./FilterBarMobile";
import { motion } from "framer-motion";
import { brandedBezier } from "@/utils/animationConstants";
import { AnimatePresence } from "framer-motion";
import MenuOldestIcon from "./Icons/MenuOldestIcon";
import MenuMagicIcon from "./Icons/MenuMagicIcon";
import MenuNewestIcon from "./Icons/MenuNewestIcon";
import { UserSetNoteFormatContext } from "@/components/Templates/FolderPageMobile";
import { AppSetNoteFormatContext } from "@/components/Templates/FolderPageMobile";
import { NoteOrderContext } from "@/components/Templates/FolderPageMobile";

export default function AllFilterOptions() {
  const { dropDownState, setDropDownState } = useContext(DropDownStateContext);
  const { userSetNoteFormat, setUserSetNoteFormat } = useContext(
    UserSetNoteFormatContext
  );
  const { appSetNoteFormat, setAppSetNoteFormat } = useContext(
    AppSetNoteFormatContext
  );
  const { noteOrder, setNoteOrder } = useContext(NoteOrderContext);

  const openDropdownVariants = {
    close: { height: 0, transition: { duration: 0.025, ease: "linear" } },
    open: {
      height: "auto",
      transition: { duration: 0.5, ease: brandedBezier },
    },
  };

  return (
    <AnimatePresence>
      {dropDownState !== "closed" && (
        <motion.div
          className="w-full bg-Brand-White flex justify-center border-Brand-Black border-t border-t-[1px] border-b border-b-[1px] overflow-hidden"
          variants={openDropdownVariants}
          initial="close"
          animate="open"
          exit="close"
          layout
          layoutRoot
        >
          <div
            className={
              "w-full p-5 max-w-4xl flex gap-10 overflow-hidden relative " +
              (dropDownState == "layout" ? "justify-end" : "justify-start")
            }
          >
            <div className="absolute z-[1] bg-White-Gradient-Right w-2 left-0 top-0 bottom-0" />
            <div className="absolute z-[1] bg-White-Gradient-Left w-2 right-0 top-0 bottom-0" />
            <FilterOptionsGroup
              filterOptionsCardArray={[
                {
                  selected: false,
                  optionTitle: "Oldest",
                  optionText: "See oldest notes first",
                  iconComponent: MenuOldestIcon,
                  contextToSet: setNoteOrder,
                  contextToGet: noteOrder,
                },
                {
                  selected: true,
                  optionTitle: "Newest",
                  optionText: "See newest notes first",
                  iconComponent: MenuNewestIcon,
                  contextToSet: setNoteOrder,
                  contextToGet: noteOrder,
                },
                {
                  selected: false,
                  optionTitle: "GPT-3.5",
                  optionText: "Order notes with a prompt",
                  iconComponent: MenuMagicIcon,
                  contextToSet: setNoteOrder,
                  contextToGet: noteOrder,
                },
              ]}
            />
            <FilterOptionsGroup
              filterOptionsCardArray={[
                {
                  selected: false,
                  optionTitle: "Simple",
                  optionText: "Compact view with headlines",
                  iconComponent: MenuSimpleIcon,
                  contextToSet: setUserSetNoteFormat,
                  contextToGet: appSetNoteFormat,
                },
                {
                  selected: true,
                  optionTitle: "Writer",
                  optionText: "Feed of notes, like a blog",
                  iconComponent: MenuWriterIcon,
                  contextToSet: setUserSetNoteFormat,
                  contextToGet: appSetNoteFormat,
                },
                {
                  selected: false,
                  optionTitle: "Grid",
                  optionText: "Stack notes in columns",
                  iconComponent: MenuGridIcon,
                  contextToSet: setUserSetNoteFormat,
                  contextToGet: appSetNoteFormat,
                },
              ]}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
