import React from "react";

const FolderBack = () => {
  return (
    <div className="flex absolute z-[-3] left-0 right-0 top-0 no-drag">
      <img src="/svg/Folder Back Left.svg" draggable="false" />
      <div className="folder-svg folder-back">
        <svg
          viewBox="0 0 100 178"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          draggable="false"
        >
          <g id="Folder Back Middle">
            <g id="Rectangle 52">
              <mask id="path-1-inside-1_197_10316" fill="white">
                <path d="M0 17H100V178H0V17Z" />
              </mask>
              <path d="M0 17H100V178H0V17Z" fill="white" />
              <path
                d="M0 18H100V16H0V18ZM100 177H0V179H100V177Z"
                fill="#111A49"
                mask="url(#path-1-inside-1_197_10316)"
              />
            </g>
          </g>
        </svg>
      </div>
      <img src="/svg/Folder Back Right.svg" draggable="false" />
    </div>
  );
};

export default FolderBack;
