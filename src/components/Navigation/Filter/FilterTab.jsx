import React, { useState, useContext, useEffect } from "react";
import TabBackground from "./TabBackground/TabBackground";
import { DropDownStateContext } from "./FilterBarMobile";
import { AnimatePresence, motion } from "framer-motion";
import { brandedBezier } from "@/utils/animationConstants";
import FilterIcon from "./Icons/FilterIcon";
import WriterIcon from "./Icons/WriterIcon";
import SimpleIcon from "./Icons/SimpleIcon";
import GridIcon from "./Icons/GridIcon";

export default function FilterTab({ label, iconType }) {
  const currentIcon = iconType || "default"; //server rendered state
  const [isSelected, setIsSelected] = useState(false); //will use this to animate the tab arrow and background
  const { dropDownState, setDropDownState } = useContext(DropDownStateContext); //which dropdown is the filter tab on
  const dropDownStateName = label.toString().toLowerCase();

  useEffect(() => {
    if (dropDownState === dropDownStateName) {
      setIsSelected(true);
    } else if (dropDownState !== dropDownStateName) {
      setIsSelected(false);
    }
  }, [dropDownState]);

  const handleClick = () => {
    if (dropDownState === dropDownStateName) {
      setDropDownState("closed");
    } else {
      setDropDownState(dropDownStateName);
    }
  };

  const iconSrc = {
    default: <FilterIcon />,
    Filter: <FilterIcon />,
    writer: <WriterIcon />,
    simple: <SimpleIcon />,
    grid: <GridIcon />,
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1], // Jump up and then down
    transition: { duration: 0.2 }, // Duration of the animation
  };

  return (
    <div className="relative" onClick={handleClick}>
      <div className="relative z-[1] flex items-center gap-2">
        <motion.div animate={pulseAnimation} key={currentIcon}>
          {iconSrc[currentIcon]}
        </motion.div>
        <div className="flex items-center leading-none">
          <span className="mt-0.5">{label}</span>
          <motion.div
            animate={{ rotate: isSelected ? 180 : 0 }}
            transition={{ duration: 0.5, ease: brandedBezier }}
          >
            <img src="/svg/Filter/Dropdown Icon.svg" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{
              scaleY: 0.6,
            }}
            animate={{
              scaleY: isSelected ? 1 : 0.6,
              transition: { duration: 0.5, ease: brandedBezier },
            }}
            exit={{
              scaleY: 0.8,
              transition: { duration: 0.025, ease: "linear" },
            }}
            style={{ originY: 1 }}
          >
            {isSelected && <TabBackground />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
