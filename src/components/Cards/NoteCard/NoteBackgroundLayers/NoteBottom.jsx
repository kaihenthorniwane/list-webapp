export default function NoteBottom() {
  return (
    <svg
      viewBox="0 0 239 48"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        gridArea: "3 / 2 / 4 / 3",
        maxHeight: "48px",
        minHeight: "48px",
      }}
      className="w-full"
    >
      <g clipPath="url(#clip0_368_10047)">
        <mask id="path-1-inside-1_368_10047" fill="rgb(var(--Brand-White))">
          <path d="M0 0H239V48H0V0Z" />
        </mask>
        <path d="M0 0H239V48H0V0Z" fill="rgb(var(--Brand-White))" />
        <path
          d="M239 47H0V49H239V47Z"
          fill="rgb(var(--Brand-Black))"
          mask="url(#path-1-inside-1_368_10047)"
        />
      </g>
      <defs>
        <clipPath id="clip0_368_10047">
          <rect width="239" height="48" fill="rgb(var(--Brand-White))" />
        </clipPath>
      </defs>
    </svg>
  );
}
