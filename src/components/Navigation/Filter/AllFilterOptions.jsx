import React from "react";
import FilterOptionsGroup from "./FilterOptionsGroup";

export default function AllFilterOptions() {
  return (
    <div className="w-full bg-Brand-White flex justify-center border-Brand-Black border-t border-t-[1px] border-b border-b-[1px]">
      <div className="w-full p-5 max-w-4xl flex gap-5 overflow-hidden">
        <FilterOptionsGroup
          filterOptionsCardArray={[
            {
              selected: false,
              optionTitle: "Simple",
              optionText: "Compact view with headlines",
            },
            {
              selected: true,
              optionTitle: "Writer",
              optionText: "Feed of notes, like a blog",
            },
            {
              selected: false,
              optionTitle: "Grid",
              optionText: "Stack notes in columns",
            },
          ]}
        />
      </div>
    </div>
  );
}
