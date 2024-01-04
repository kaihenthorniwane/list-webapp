import SmoothButtonRedOutlineBackground from "./SmoothButtonRedOutlineBackground";

export default function SmoothButtonRedOutline({
  text = "Smooth Button",
  functionToRun = () => {},
  Icon = null,
}) {
  return (
    <div
      className="relative w-full brand-button-transition opacity-button-transition "
      onClick={() => {
        functionToRun();
      }}
    >
      <div className="absolute z-[1] gap-2.5 bottom-0 top-0 left-0 right-0 flex justify-center items-center text-Brand-Red">
        {Icon && <Icon />}
        <span className="mt-0.5">{text}</span>
      </div>
      <SmoothButtonRedOutlineBackground />
    </div>
  );
}
