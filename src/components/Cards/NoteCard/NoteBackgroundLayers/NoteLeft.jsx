export default function NoteLeft() {
  return (
    <svg
      preserveAspectRatio="none"
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        gridArea: "2 / 1 / 3 / 2",
        maxWidth: "48px",
        minHeight: "0px",
      }}
    >
      <g clipPath="url(#clip0_368_10041)">
        <mask id="path-1-inside-1_368_10041" fill="rgb(var(--Brand-White))">
          <path d="M48 0L48 31.9999L-1.39876e-06 31.9999L0 -2.09815e-06L48 0Z" />
        </mask>
        <path
          d="M48 0L48 31.9999L-1.39876e-06 31.9999L0 -2.09815e-06L48 0Z"
          fill="rgb(var(--Brand-White))"
        />
        <path
          d="M0.999999 31.9999L1 -2.05444e-06L-1 -2.14186e-06L-1 31.9999L0.999999 31.9999Z"
          fill="rgb(var(--Brand-Black))"
          // mask="url(#path-1-inside-1_368_10041)"
        />
      </g>
      <defs>
        <clipPath id="clip0_368_10041">
          <rect
            width="31.9999"
            height="48"
            fill="rgb(var(--Brand-White))"
            transform="translate(48) rotate(90)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
