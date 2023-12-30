import React from "react";

const FolderBack = () => {
  return (
    <div className="flex absolute z-[-3] left-0 right-0 top-0 no-drag">
      <svg
        draggable="false "
        width="109"
        height="178"
        viewBox="0 0 109 178"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="min-w-[109px]"
      >
        <g id="Folder Back Left">
          <path
            id="Fill"
            d="M2.55025 2.55025C0.5 4.6005 0.5 7.90034 0.5 14.5V147.5C0.5 161.642 0.5 168.713 4.8934 173.107C9.28678 177.5 16.3578 177.5 30.4998 177.5H30.5H109V17.5H104.125L87.3784 3.69676C85.4588 2.11452 84.499 1.3234 83.3522 0.911702C82.2054 0.5 80.9616 0.5 78.4739 0.5H14.5C7.90034 0.5 4.6005 0.5 2.55025 2.55025Z"
            fill="white"
          />
          <path
            id="Stroke"
            d="M109 17.5H104.125L87.3784 3.69676C85.4588 2.11452 84.499 1.3234 83.3522 0.911702C82.2054 0.5 80.9616 0.5 78.4739 0.5H14.5C7.90034 0.5 4.6005 0.5 2.55025 2.55025C0.5 4.6005 0.5 7.90034 0.5 14.5V147.5C0.5 161.642 0.5 168.713 4.8934 173.107C9.2868 177.5 16.3579 177.5 30.5 177.5H109"
            stroke="#111A49"
            strokeLinejoin="round"
          />
        </g>
      </svg>

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
      <svg
        width="31"
        height="178"
        viewBox="0 0 31 178"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        draggable="false"
        className="min-w-[31px]"
      >
        <g id="Folder Back Right">
          <path
            id="Fill"
            d="M0 177.5C14.1422 177.5 21.7132 177.5 26.1066 173.107C30.5 168.713 30.5 161.642 30.5 147.5V31.5C30.5 24.9003 30.5 21.6005 28.4497 19.5503C26.3995 17.5 23.0997 17.5 16.5 17.5L0 17.5V177.5Z"
            fill="white"
          />
          <path
            id="Stroke"
            d="M0 177.5C14.1422 177.5 21.7132 177.5 26.1066 173.107C30.5 168.713 30.5 161.642 30.5 147.5V31.5C30.5 24.9003 30.5 21.6005 28.4497 19.5503C26.3995 17.5 23.0997 17.5 16.5 17.5L0 17.5"
            stroke="#111A49"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};

export default FolderBack;
