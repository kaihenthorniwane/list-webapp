import React from "react";
import FilterOptionCard from "./FilterOptionCard";
import { motion } from "framer-motion";
import { brandedBezier } from "@/utils/animationConstants";

export default function FilterOptionsGroup({ filterOptionsCardArray }) {
  return (
    <motion.div
      className="w-full flex-shrink-0 gap-5 flex"
      layout
      transition={{ duration: 0.25, ease: brandedBezier }}
    >
      {filterOptionsCardArray.map((cardInfo, index) => (
        <FilterOptionCard
          key={index}
          selected={cardInfo.selected}
          optionTitle={cardInfo.optionTitle}
          optionText={cardInfo.optionText}
          iconComponent={cardInfo.iconComponent}
          contextToSet={cardInfo.contextToSet}
          contextToGet={cardInfo.contextToGet}
        />
      ))}
    </motion.div>
  );
}
