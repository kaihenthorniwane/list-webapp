import React from "react";

const FolderFront = () => {
  return (
    <div className="flex absolute z-[-1] -left-2 -right-2 bottom-0 no-drag">
      <svg
        width="35"
        height="146"
        viewBox="0 0 35 146"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        draggable="false"
        className="min-w-[35px]"
      >
        <g id="Folder Front Left">
          <path
            id="Fill"
            d="M0.661752 15.0788L4.88489 116.74C5.45004 130.345 5.73261 137.147 10.1024 141.324C14.4722 145.5 21.3069 145.5 34.9765 145.5L34.9765 0.5H14.7045C7.82415 0.5 4.38398 0.500002 2.30952 2.65366C0.235062 4.80731 0.377292 8.23115 0.661752 15.0788Z"
            fill="rgb(var(--Brand-White))"
          />
          <path
            id="Stroke"
            d="M35 145.5C21.3305 145.5 14.4722 145.5 10.1024 141.324C5.73261 137.147 5.45004 130.345 4.88489 116.74L0.661752 15.0788C0.377292 8.23115 0.235062 4.80731 2.30952 2.65366C4.38398 0.500002 7.82415 0.5 14.7045 0.5H35"
            stroke="rgb(var(--Brand-Black))"
          />
        </g>
      </svg>

      <div className="folder-svg">
        <svg
          viewBox="0 0 100 146"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          draggable="false"
        >
          <path d="M0 0H100V146H0V0Z" fill="rgb(var(--Brand-White))" />
          <path
            d="M0 1H100V-1H0V1ZM100 145H0V147H100V145Z"
            fill="rgb(var(--Brand-Black))"
            mask="url(#path-1-inside-1_197_10275)"
          />
        </svg>
      </div>
      <svg
        draggable="false"
        width="35"
        height="146"
        viewBox="0 0 35 146"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="min-w-[35px]"
      >
        <g id="Folder Front Right">
          <path
            id="Fill"
            d="M34.3382 15.0788L30.115 116.74C29.5499 130.345 29.2673 137.147 24.8975 141.324C20.5278 145.5 13.693 145.5 0.0234375 145.5V0.5H20.2954C27.1758 0.5 30.6159 0.500002 32.6904 2.65366C34.7648 4.80731 34.6226 8.23115 34.3382 15.0788Z"
            fill="rgb(var(--Brand-White))"
          />
          <path
            id="Stroke"
            d="M0.0234375 145.5C13.693 145.5 20.5278 145.5 24.8975 141.324C29.2673 137.147 29.5499 130.345 30.115 116.74L34.3382 15.0788C34.6226 8.23115 34.7649 4.80731 32.6904 2.65366C30.6159 0.500002 27.1758 0.5 20.2954 0.5H0.0234375"
            stroke="rgb(var(--Brand-Black))"
          />
        </g>
      </svg>
    </div>
  );
};

export default FolderFront;
