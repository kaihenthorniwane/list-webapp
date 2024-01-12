export default function NoteTop() {
  return (
    <svg
      viewBox="0 0 239 48"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        gridArea: "1 / 2 / 2 / 3",
        maxHeight: "48px",
        minHeight: "48px",
      }}
      className="w-full"
    >
      <g clipPath="url(#clip0_368_10045)">
        <mask id="path-1-inside-1_368_10045" fill="rgb(var(--Brand-White))">
          <path d="M239 48L0 48L4.19629e-06 -2.0894e-05L239 0L239 48Z" />
        </mask>
        <path
          d="M239 48L0 48L4.19629e-06 -2.0894e-05L239 0L239 48Z"
          fill="rgb(var(--Brand-White))"
        />
        <path
          d="M4.10887e-06 0.999979L239 1L239 -1L4.28372e-06 -1.00002L4.10887e-06 0.999979Z"
          fill="rgb(var(--Brand-Black))"
          // mask="url(#path-1-inside-1_368_10045)"
        />
      </g>
      <defs>
        <clipPath id="clip0_368_10045">
          <rect
            width="239"
            height="48"
            fill="rgb(var(--Brand-White))"
            transform="translate(239 48) rotate(-180)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
