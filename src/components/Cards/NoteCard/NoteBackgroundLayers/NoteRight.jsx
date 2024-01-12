export default function NoteRight() {
  return (
    <svg
      preserveAspectRatio="none"
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        gridArea: "2 / 3 / 3 / 4",
        maxWidth: "48px",
        minHeight: "0px",
      }}
    >
      <g clipPath="url(#clip0_368_10043)">
        <mask id="path-1-inside-1_368_10043" fill="rgb(var(--Brand-White))">
          <path d="M0 32L3.45821e-07 0L48 6.31608e-07L48 32L0 32Z" />
        </mask>
        <path
          d="M0 32L3.45821e-07 0L48 6.31608e-07L48 32L0 32Z"
          fill="rgb(var(--Brand-White))"
        />
        <path
          d="M47 6.18449e-07L47 32L49 32L49 6.44766e-07L47 6.18449e-07Z"
          fill="rgb(var(--Brand-Black))"
          // mask="url(#path-1-inside-1_368_10043)"
        />
      </g>
      <defs>
        <clipPath id="clip0_368_10043">
          <rect
            width="32"
            height="48"
            fill="rgb(var(--Brand-White))"
            transform="translate(0 32) rotate(-90)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
