import SmoothButtonRedLeft from "./Smooth Button Red Layers/SmoothButtonRedLeft";
import SmoothButtonRedMiddle from "./Smooth Button Red Layers/SmoothButtonRedMiddle";
import SmoothButtonRedRight from "./Smooth Button Red Layers/SmoothButtonRedRight";

export default function SmoothButtonRedBackground() {
  return (
    <div className="flex">
      <SmoothButtonRedLeft />
      <SmoothButtonRedMiddle />
      <SmoothButtonRedRight />
    </div>
  );
}
