import { useOverlay } from "@/contexts/OverlayContext";
import { useState } from "react";
import Drawer from "../../Drawer";
import AccountInfoContents from "../AccountInfoContents";

export default function UserProfile({
  firstname,
  name,
  image,
  email,
  variant = "small",
}) {
  const { setIsOn, setOverlay } = useOverlay();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const imageSizesVariants = {
    small: "38px",
    big: "118px",
  };

  const divSizesVariants = {
    small:
      "h-10 w-10 cursor-pointer brand-button-transition opacity-button-transition lesser-transform grayscale hover:grayscale-0  ",
    big: "h-30 w-30",
  };

  const clickFunctionVariants = {
    small: () => {
      setOverlay(
        <Drawer>
          <AccountInfoContents />
        </Drawer>
      );
      setIsOn(true);
    },
    big: () => {},
  };

  return (
    <div
      className={
        "flex items-center gap-2 relative p-[1px] " + divSizesVariants[variant]
      }
      onClick={clickFunctionVariants[variant]}
    >
      <img
        src={image}
        height={imageSizesVariants[variant]}
        width={imageSizesVariants[variant]}
        className="relative z-[0]"
        onLoad={() => {
          setIsImageLoaded(true);
        }}
        style={{ display: !isImageLoaded && "none" }}
      />
      {variant === "small" && (
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
            fill="rgb(var(--Brand-White))"
          />
        </svg>
      )}
      {variant === "big" && (
        <svg
          width="121"
          height="120"
          viewBox="0 0 121 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute z-[0] top-0 bottom-0 left-0 right-0"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M120.5 0H0.5V120H120.5V0ZM8.17107 16.5033C2.5 24.8823 2.5 36.5882 2.5 60C2.5 83.4118 2.5 95.1177 8.17107 103.497C10.526 106.976 13.5238 109.974 17.0033 112.329C25.3823 118 37.0882 118 60.5 118C83.9118 118 95.6177 118 103.997 112.329C107.476 109.974 110.474 106.976 112.829 103.497C118.5 95.1177 118.5 83.4118 118.5 60C118.5 36.5882 118.5 24.8823 112.829 16.5033C110.474 13.0238 107.476 10.026 103.997 7.67107C95.6177 2 83.9118 2 60.5 2C37.0882 2 25.3823 2 17.0033 7.67107C13.5238 10.026 10.526 13.0238 8.17107 16.5033Z"
            fill="rgb(var(--Brand-White))"
          />
        </svg>
      )}
    </div>
  );
}
