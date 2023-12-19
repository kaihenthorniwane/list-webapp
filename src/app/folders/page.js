import FolderTitle from "@/components/Navigation/FolderTitle";
import React from "react";

export default function Folders() {
  return (
    <div className="px-5 py-4">
      <FolderTitle headerText={"Folders"} crumbNameAndLinkArray={undefined} />
    </div>
  );
}
