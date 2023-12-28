import { brandedBezier } from "@/utils/animationConstants";
import { AnimatePresence, motion } from "framer-motion";
import { useOverlay } from "@/contexts/OverlayContext";

export default function Modal({ children }) {
  const { isOn, setIsOn } = useOverlay();

  const handleAnimationStart = () => {
    // Action when the animation starts
    // document.documentElement.style.overflow = "hidden";
    document.body.style.maxHeight = "100vh";
    document.body.style.overflow = "hidden";
  };

  const handleExitComplete = () => {
    // Action when the exit animation ends
    // document.documentElement.style.overflow = "auto";
    document.body.style.maxHeight = "none";
    document.body.style.overflow = "auto";
  };

  return (
    <AnimatePresence>
      {isOn && (
        <>
          <motion.div
            className="fixed z-[100] top-0 left-0 right-0 bottom-0 flex p-5 items-center justify-center"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { ease: brandedBezier },
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
              transition: { duration: 0.05, ease: "linear" },
            }}
          >
            <div className="max-w-4xl w-full p-7 bg-Brand-White flex flex-col items-stretch gap-6 rounded-[2.75rem]">
              {children}
            </div>
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
