import React from "react";

const FolderBack = () => {
  return (
    <div className="flex absolute z-0 left-0 right-0 top-0">
      <img src="/svg/Folder Back Left.svg" />
      <img
        src="/svg/Folder Back Middle.svg"
        className="flex-grow min-w-0 max-h-folder-back "
      />
      <img src="/svg/Folder Back Right.svg" />
    </div>
  );
};

export default FolderBack;
