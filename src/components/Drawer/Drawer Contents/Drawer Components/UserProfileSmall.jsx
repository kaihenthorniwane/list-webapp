import { useOverlay } from "@/contexts/OverlayContext";
import { useState } from "react";
import Drawer from "../../Drawer";
import AccountInfoContents from "../AccountInfoContents";

export default function UserProfile({
  firstname,
  name,
  image,
  email,
  variant,
}) {
  const { setIsOn, setOverlay } = useOverlay();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <div
      className="flex items-center gap-2 cursor-pointer h-10 w-10 relative grayscale brand-button-transition opacity-button-transition lesser-transform hover:grayscale-0"
      onClick={() => {
        setOverlay(
          <Drawer>
            <AccountInfoContents />
          </Drawer>
        );
        setIsOn(true);
      }}
    >
      <img
        src={image}
        height={"38px"}
        width={"38px"}
        className="absolute top-[1px] left-[1px] right-[1px] bottom-[1px] z-[-1]"
        onLoad={() => {
          setIsImageLoaded(true);
        }}
        style={{ display: !isImageLoaded && "none" }}
      />
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute z-[0] top-0 bottom-0 left-0 right-0"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M40 0H0V40H40V0ZM2.74621 6.05295C1 8.77011 1 12.5134 1 20C1 27.4866 1 31.2299 2.74621 33.947C3.59871 35.2736 4.72644 36.4013 6.05295 37.2538C8.77011 39 12.5134 39 20 39C27.4866 39 31.2299 39 33.947 37.2538C35.2736 36.4013 36.4013 35.2736 37.2538 33.947C39 31.2299 39 27.4866 39 20C39 12.5134 39 8.77011 37.2538 6.05295C36.4013 4.72644 35.2736 3.59871 33.947 2.74621C31.2299 1 27.4866 1 20 1C12.5134 1 8.77011 1 6.05295 2.74621C4.72644 3.59871 3.59871 4.72644 2.74621 6.05295Z"
          fill="white"
        />
      </svg>
    </div>
  );
}
