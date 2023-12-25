import React from "react";
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

  return (
    <div
      className={
        "w-full no-drag relative " +
        (contextToGet === optionName ? "text-Brand-White" : "")
      }
      onClick={() => {
        contextToSet(optionName);
      }}
    >
      <div className="flex flex-col gap-2 relative z-[2]">
        <div className="flex gap-1 items-center leading-none">
          {IconComponent && (
            <IconComponent
              fill={
                contextToGet === optionName
                  ? "rgb(var(--White))"
                  : "rgb(var(--Brand-Black))"
              }
            />
          )}
          <span className="-mb-1">{optionTitle}</span>
        </div>
        <div className="text-14 leading-none">{optionText}</div>
      </div>
      <AnimatePresence>
        {contextToGet === optionName && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{
              scale: 1,
              transition: { duration: 0.5, ease: brandedBezier },
            }}
            exit={{
              scale: 0.8,
              transition: { duration: 0.05, ease: "linear" },
            }}
            className="bg-Brand-Black absolute z-[1] rounded-xl -top-2.5 -bottom-2.5 -left-2.5 -right-2.5"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
