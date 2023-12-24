import React from "react";
import FolderTabLeft from "./FolderTabLeft";
import FolderTabMid from "./FolderTabMid";
import FolderTabRight from "./FolderTabRight";

export default function TabBackground() {
  return (
    <div className="absolute top-0 bottom-0 -mb-[1px] -left-4 -right-4 flex items-end">
      <FolderTabLeft />
      <FolderTabMid />
      <FolderTabRight />
    </div>
  );
}
