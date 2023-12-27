import { brandedBezier } from "@/utils/animationConstants";
import { AnimatePresence, motion } from "framer-motion";

export default function Drawer({ isOpen, children, setContext }) {
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
      setContext(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed z-[100] left-0 right-0 bottom-0 flex justify-center"
            initial={{ translateY: "100%" }}
            animate={{ translateY: 0 }}
            exit={{ translateY: "100%" }}
            transition={{ ease: brandedBezier }}
          >
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={handleDragEnd}
              dragElastic={0.7}
              className="max-w-4xl w-full px-5 pb-5 pt-4 pb-[101.25rem] mb-[-100rem]  bg-Brand-White flex flex-col items-stretch gap-6 rounded-tl-[2rem] rounded-tr-[2rem]"
            >
              <div className="w-20 rounded-md bg-Brand-Black h-1 mx-auto" />
              {children}
            </motion.div>
          </motion.div>
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5, transition: { ease: brandedBezier } }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.025,
                ease: "linear",
                onComplete: handleExitComplete,
              },
            }}
            onClick={() => {
              setContext(false);
            }}
            onAnimationStart={handleAnimationStart}
            className="fixed z-[99] w-full h-full bg-Brand-Black opacity-50"
          />
        </>
      )}
    </AnimatePresence>
  );
}
