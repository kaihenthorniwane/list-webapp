import SmoothButtonRedBackground from "./SmoothButtonRedBackground";

export default function SmoothButtonRed({
  text = "Smooth Button",
  functionToRun,
}) {
  return (
    <div
      className="relative w-full brand-button-transition opacity-button-transition"
      onClick={() => {
        functionToRun();
      }}
    >
      <div className="absolute z-[1] mt-0.5 bottom-0 top-0 left-0 right-0 flex justify-center items-center text-Brand-White">
        {text}
      </div>
      <SmoothButtonRedBackground />
    </div>
  );
}
