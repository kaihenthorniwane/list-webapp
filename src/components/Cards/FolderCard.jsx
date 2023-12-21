import React from "react";
import FolderBack from "./FolderBack";
import FolderFront from "./FolderFront";

const FolderCard = ({ folder_id, folder_name }) => {
  // const folderDB = await sql `SELECT * FROM folders WHERE folder_id = ${folder_id}`;
  // const folderRow = folderDB.rows[0];
  return (
    <div className="flex p-5 flex-col justify-end gap-1 relative h-folder-card">
      <FolderBack />
      <FolderFront />
      <span className="relative z-3 font-header text-24 font-600">
        {folder_name}
      </span>
    </div>
  );
};

export default FolderCard;
