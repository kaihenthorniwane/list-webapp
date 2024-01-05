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
        "flex items-center gap-2 relative " + divSizesVariants[variant]
      }
      onClick={clickFunctionVariants[variant]}
    >
      <img
        src={image}
        height={imageSizesVariants[variant]}
        width={imageSizesVariants[variant]}
        className="absolute top-[1px] left-[1px] right-[1px] bottom-[1px] z-[0]"
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
            fill="white"
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
            d="M120.5 0H0.5V120H120.5V0ZM7.61899 14.8581C1.5 23.451 1.5 35.634 1.5 60C1.5 84.366 1.5 96.549 7.61899 105.142C9.74994 108.134 12.3656 110.75 15.3581 112.881C23.951 119 36.134 119 60.5 119C84.866 119 97.049 119 105.642 112.881C108.634 110.75 111.25 108.134 113.381 105.142C119.5 96.549 119.5 84.366 119.5 60C119.5 35.634 119.5 23.451 113.381 14.8581C111.25 11.8656 108.634 9.24994 105.642 7.11899C97.049 1 84.866 1 60.5 1C36.134 1 23.951 1 15.3581 7.11899C12.3656 9.24994 9.74994 11.8656 7.61899 14.8581Z"
            fill="white"
          />
        </svg>
      )}
    </div>
  );
}
