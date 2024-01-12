import React from "react";
import FolderTabLeft from "./FolderTabLeft";
import FolderTabMid from "./FolderTabMid";
import FolderTabRight from "./FolderTabRight";

export default function TabBackground() {
  return (
    <div className="absolute top-0 bottom-0 -mb-[3px] pb-[2px] -left-4 -right-3 flex items-end bg-Brand-White">
      <FolderTabLeft />
      <FolderTabMid />
      <FolderTabRight />
    </div>
  );
}
