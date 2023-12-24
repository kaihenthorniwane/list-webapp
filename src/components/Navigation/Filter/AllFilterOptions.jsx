import React from "react";
import FilterOptionsGroup from "./FilterOptionsGroup";
import MenuGridIcon from "./Icons/MenuGridIcon";
import MenuSimpleIcon from "./Icons/MenuSimpleIcon";
import MenuWriterIcon from "./Icons/MenuWriterIcon";

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
      </div>
    </div>
  );
}
