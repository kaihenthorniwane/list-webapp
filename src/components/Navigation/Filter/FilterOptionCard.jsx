import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { brandedBezier } from "@/utils/animationConstants";

export default function FilterOptionCard({
  selected,
  optionTitle,
  optionText,
  iconComponent: IconComponent,
  contextToSet,
  contextToGet,
}) {
  const optionName = optionTitle.toString().toLowerCase();

  const getCSSVariableValue = (variableName) => {
    // Get the value of the CSS variable
    const value = getComputedStyle(document.documentElement).getPropertyValue(
      variableName
    );

    // Return the value, trimmed to remove extra whitespace
    return value.trim();
  };

  // Usage
  const brandBlackValue = getCSSVariableValue("--Brand-Black");
  const whiteColorValue = getCSSVariableValue("--White");

  const [iconColor, setIconColor] = useState("rgb(" + brandBlackValue + ")");

  const textStyles = {
    on: {
      color: "rgb(" + whiteColorValue + ")",
      transition: {
        delay: 0,
        duration: 0,
        onComplete: () => {
          setIconColor("rgb(" + whiteColorValue + ")");
        },
      },
    },
    off: {
      color: "rgb(" + brandBlackValue + ")",
      transition: {
        delay: 0.025,
        duration: 0,
        onComplete: () => {
          setIconColor("rgb(" + brandBlackValue + ")");
        },
      },
    },
  };

  return (
    <motion.div
      className={"w-full no-drag relative"}
      animate={
        contextToGet === optionName ? textStyles["on"] : textStyles["off"]
      }
      onClick={() => {
        contextToSet(optionName);
      }}
    >
      <div className="flex flex-col gap-2 relative z-[2]">
        <div className="flex gap-1 items-center leading-none ">
          {IconComponent && <IconComponent fill={iconColor} />}
          <span className="-mb-1">{optionTitle}</span>
        </div>
        <div className="text-14 leading-none">{optionText}</div>
      </div>
      <AnimatePresence>
        {contextToGet === optionName && (
          <motion.div
            initial={{ scale: 0.75 }}
            animate={{
              scale: 1,
              transition: { duration: 0.35, ease: brandedBezier },
            }}
            exit={{
              scale: 0.9,
              transition: { duration: 0.025, ease: "linear" },
            }}
            className="bg-Brand-Black absolute z-[1] rounded-xl -top-2.5 -bottom-2.5 -left-2.5 -right-2.5"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
