import React from "react";
import FilterOptionCard from "./FilterOptionCard";

export default function FilterOptionsGroup({ filterOptionsCardArray }) {
  return (
    <div className="w-full flex-shrink-0 gap-5 flex">
      {filterOptionsCardArray.map((cardInfo, index) => (
        <FilterOptionCard
          key={index}
          selected={cardInfo.selected}
          optionTitle={cardInfo.optionTitle}
          optionText={cardInfo.optionText}
        />
      ))}
    </div>
  );
}
