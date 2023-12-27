import SmoothButtonBackground from "./SmoothButtonBackground";

export default function SmoothButton({
  text = "Smooth Button",
  setContext,
  valueToSet,
}) {
  return (
    <div
      className="relative w-full brand-button-transition"
      onClick={() => {
        setContext(valueToSet);
      }}
    >
      <div className="absolute z-[1] mt-0.5 bottom-0 top-0 left-0 right-0 flex justify-center items-center">
        {text}
      </div>
      <SmoothButtonBackground />
    </div>
  );
}
