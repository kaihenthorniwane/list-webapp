export default function SmoothButtonRedOutlineMiddle() {
  return (
    <svg
      viewBox="0 0 167 60"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-h-smooth-button min-w-0"
    >
      <mask id="path-1-inside-1_388_12415" fill="rgb(var(--Brand-White))">
        <path d="M0 0H167V60H0V0Z" />
      </mask>
      <path d="M0 0H167V60H0V0Z" fill="rgb(var(--Brand-White))" />
      <path
        d="M0 2H167V-2H0V2ZM167 58H0V62H167V58Z"
        fill="rgb(var(--Brand-Red))"
        // mask="url(#path-1-inside-1_388_12415)"
      />
    </svg>
  );
}
