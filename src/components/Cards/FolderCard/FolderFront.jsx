import React from "react";

const FolderFront = () => {
  return (
    <div className="flex absolute z-[-1] -left-2 -right-2 bottom-0 no-drag">
      <img src="/svg/Folder Front Left.svg" draggable="false" />
      <div className="folder-svg">
        <svg
          viewBox="0 0 100 146"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          draggable="false"
        >
          <path d="M0 0H100V146H0V0Z" fill="white" />
          <path
            d="M0 1H100V-1H0V1ZM100 145H0V147H100V145Z"
            fill="#111A49"
            mask="url(#path-1-inside-1_197_10275)"
          />
        </svg>
      </div>
      <img src="/svg/Folder Front Right.svg" draggable="false" />
    </div>
  );
};

export default FolderFront;
