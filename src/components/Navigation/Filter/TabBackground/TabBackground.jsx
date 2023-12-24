import React from "react";
import FolderTabLeft from "./FolderTabLeft";
import FolderTabMid from "./FolderTabMid";
import FolderTabRight from "./FolderTabRight";

export default function TabBackground() {
  return (
    <div className="absolute top-0 bottom-0 -mb-[3px] pb-[2px] -left-4 -right-4 flex items-end bg-white">
      <FolderTabLeft />
      <FolderTabMid />
      <FolderTabRight />
    </div>
  );
}
