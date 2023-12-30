import { brandedBezier } from "@/utils/animationConstants";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { useEffect, useState } from "react";
import { useOverlay } from "@/contexts/OverlayContext";

export default function Drawer({ children }) {
  const { isOn, setIsOn } = useOverlay();

  const controls = useDragControls();
  function startDrag(event) {
    controls.start(event);
  }

  const handleAnimationStart = () => {
    // Action when the animation starts
    // document.documentElement.style.overflow = "hidden";
    document.body.style.maxHeight = "85vh";
    document.body.style.overflow = "hidden";
  };

  const handleExitComplete = () => {
    // Action when the exit animation ends
    // document.documentElement.style.overflow = "auto";
    document.body.style.maxHeight = "none";
    document.body.style.overflow = "auto";
  };

  function remToPixels(rem) {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }

  const handleDragEnd = (event, info) => {
    // Define the threshold for closing the drawer (distance from bottom of the screen)
    const closeThreshold = remToPixels(10); // You can adjust this value as needed

    // Get the bounding rectangle of the dragged element
    const boundingRect = event.target.getBoundingClientRect();

    // Calculate the distance from the bottom of the screen
    const distanceFromBottom = window.innerHeight - boundingRect.top;
    console.log(window.innerHeight);
    console.log(boundingRect.top);

    // Check if the distance from the bottom is less than or equal to the threshold
    if (distanceFromBottom <= closeThreshold) {
      setIsOn(!isOn);
    }
  };

  const motionDivProps =
    window.innerWidth >= 768
      ? {
          initial: { scale: 1.05, opacity: 0 },
          animate: {
            scale: 1,
            opacity: 1,
            transition: { ease: brandedBezier },
          },
          exit: {
            scale: 0.8,
            opacity: 0,
            transition: { duration: 0.05, ease: "linear" },
          },
        }
      : {
          initial: { translateY: "100%" },
          animate: { translateY: 0 },
          exit: { translateY: "100%" },
          transition: { ease: brandedBezier },
        };

  return (
    <AnimatePresence>
      {isOn && (
        <>
          <motion.div
            className="fixed z-[100] left-0 right-0 bottom-0 flex justify-center md:top-0 md:items-center md:p-5"
            {...motionDivProps}
            onClick={(e) => {
              if (window.innerWidth >= 768) {
                setIsOn(false);
              }
            }}
          >
            <motion.div
              layout
              transition={{ duration: 0.2, ease: brandedBezier }}
              drag="y"
              dragListener={false}
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={handleDragEnd}
              dragControls={controls}
              dragElastic={0.7}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="md:max-w-xl md:p-7 md:m-0 md:rounded-[2.75rem] relative max-w-3xl w-full px-5 pb-5 pb-[101.25rem] mb-[-100rem]  bg-Brand-White flex flex-col items-stretch rounded-tl-[2rem] rounded-tr-[2rem] overflow-hidden"
            >
              <div
                className="pt-4 pb-6 -mx-5 bg-White-Gradient-Down-More-White relative z-[1] md:hidden"
                onPointerDown={startDrag}
                style={{ touchAction: "none" }}
              >
                <div className="w-20 rounded-md bg-Brand-Black h-1 mx-auto " />
              </div>
              {children}
            </motion.div>
          </motion.div>
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0} //add dragability to the overlay so it blocks the normal scroll behind it
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0.5, transition: { ease: brandedBezier } }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.05,
                ease: "linear",
                onComplete: handleExitComplete,
              },
            }}
            onClick={() => {
              setIsOn(false);
            }}
            onAnimationStart={handleAnimationStart}
            className="fixed z-[99] w-full h-full bg-Brand-Black opacity-50"
          />
        </>
      )}
    </AnimatePresence>
  );
}
