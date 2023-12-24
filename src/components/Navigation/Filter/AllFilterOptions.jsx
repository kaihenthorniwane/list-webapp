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

export default function AllFilterOptions() {
  const { dropDownState, setDropDownState } = useContext(DropDownStateContext);

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
        >
          <div
            className={
              "w-full p-5 max-w-4xl flex gap-5 overflow-hidden " +
              (dropDownState == "layout" ? "justify-start" : "justify-end")
            }
          >
            <FilterOptionsGroup
              filterOptionsCardArray={[
                {
                  selected: false,
                  optionTitle: "Simple",
                  optionText: "Compact view with headlines",
                  iconComponent: MenuSimpleIcon,
                },
                {
                  selected: true,
                  optionTitle: "Writer",
                  optionText: "Feed of notes, like a blog",
                  iconComponent: MenuWriterIcon,
                },
                {
                  selected: false,
                  optionTitle: "Grid",
                  optionText: "Stack notes in columns",
                  iconComponent: MenuGridIcon,
                },
              ]}
            />
            <FilterOptionsGroup
              filterOptionsCardArray={[
                {
                  selected: false,
                  optionTitle: "Oldest",
                  optionText: "See oldest notes first",
                  iconComponent: MenuOldestIcon,
                },
                {
                  selected: true,
                  optionTitle: "Newest",
                  optionText: "See newest notes first",
                  iconComponent: MenuNewestIcon,
                },
                {
                  selected: false,
                  optionTitle: "GPT-3.5",
                  optionText: "Order notes with a prompt",
                  iconComponent: MenuMagicIcon,
                },
              ]}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
