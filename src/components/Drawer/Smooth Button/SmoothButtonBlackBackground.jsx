import SmoothButtonBlackLeft from "./Smooth Button Black Layers/SmoothButtonBlackLeft";
import SmoothButtonBlackMiddle from "./Smooth Button Black Layers/SmoothButtonBlackMiddle";
import SmoothButtonBlackRight from "./Smooth Button Black Layers/SmoothButtonBlackRight";

export default function SmoothButtonBlackBackground() {
  return (
    <div className="flex">
      <SmoothButtonBlackLeft />
      <SmoothButtonBlackMiddle />
      <SmoothButtonBlackRight />
    </div>
  );
}
