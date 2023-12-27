import SmoothButtonLeft from "./Smooth Button Layers/SmoothButtonLeft";
import SmoothButtonMiddle from "./Smooth Button Layers/SmoothButtonMiddle";
import SmoothButtonRight from "./Smooth Button Layers/SmoothButtonRight";

export default function SmoothButtonBackground() {
  return (
    <div className="flex">
      <SmoothButtonLeft />
      <SmoothButtonMiddle />
      <SmoothButtonRight />
    </div>
  );
}
