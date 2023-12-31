import SmoothButtonBlackBackground from "./SmoothButtonBlackBackground";
export default function SmoothButtonBlack({
  text = "Smooth Button",
  functionToRun = () => {},
  disabled = false,
}) {
  return (
    <div
      className={
        "relative w-full " +
        (!disabled && "brand-button-transition opacity-button-transition")
      }
      onClick={() => {
        functionToRun();
      }}
    >
      <div className="absolute z-[1] mt-0.5 bottom-0 top-0 left-0 right-0 flex justify-center items-center text-Brand-White">
        {text}
      </div>
      <SmoothButtonBlackBackground />
    </div>
  );
}
