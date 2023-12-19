import FolderTitle from "@/components/Navigation/FolderTitle";
import React from "react";

const folderData = [
  {
    id: 0,
    folderName: "My Workspace",
  },
  {
    id: 1,
    folderName: "Random Stuff",
  },
];

export default function Folders() {
  return (
    <div className="px-5 py-5">
      <FolderTitle headerText={"Folders"} crumbNameAndLinkArray={undefined} />
    </div>
  );
}
