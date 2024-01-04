import SmoothButtonRedOutlineLeft from "./Smooth Button Red Outline Layers/SmoothButtonRedOutlineLeft";
import SmoothButtonRedOutlineMiddle from "./Smooth Button Red Outline Layers/SmoothButtonRedOutlineMiddle";
import SmoothButtonRedOutlineRight from "./Smooth Button Red Outline Layers/SmoothButtonRedOutlineRight";

export default function SmoothButtonRedOutlineBackground() {
  return (
    <div className="flex">
      <SmoothButtonRedOutlineLeft />
      <SmoothButtonRedOutlineMiddle />
      <SmoothButtonRedOutlineRight />
    </div>
  );
}
