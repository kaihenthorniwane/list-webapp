import React from "react";

const FolderFront = () => {
  return (
    <div className="flex absolute z-1 -left-2 -right-2 bottom-0">
      <img src="/svg/Folder Front Left.svg" />
      <img
        src="/svg/Folder Front Middle.svg"
        className="flex-grow min-w-0 max-h-folder-front"
      />
      <img src="/svg/Folder Front Right.svg" />
    </div>
  );
};

export default FolderFront;
