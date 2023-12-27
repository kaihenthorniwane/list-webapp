import { brandedBezier } from "@/utils/animationConstants";
import { AnimatePresence, motion } from "framer-motion";

export default function Drawer({ isOpen, children, setContext }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed z-[100] left-0 right-0 bottom-0 px-5 pb-5 pt-4  bg-Brand-White flex flex-col items-stretch gap-6 rounded-tl-2xl rounded-tr-2xl"
            initial={{ translateY: "100%" }}
            animate={{ translateY: 0 }}
            exit={{ translateY: "100%" }}
            transition={{ ease: brandedBezier }}
          >
            <div className="w-20 rounded-md bg-Brand-Black h-1 mx-auto" />
            {children}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5, transition: { ease: brandedBezier } }}
            exit={{
              opacity: 0,
              transition: { duration: 0.025, ease: "linear" },
            }}
            onClick={() => {
              setContext(false);
            }}
            className="fixed z-[99] w-full h-full bg-Brand-Black opacity-50"
          />
        </>
      )}
    </AnimatePresence>
  );
}
