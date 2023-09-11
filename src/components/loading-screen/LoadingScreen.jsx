"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AppLogo } from "..";

const LoadingScreen = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const handleAnimationEnd = () => {
    setTimeout(() => {
      setShowLoadingScreen(false);
    }, 500);
  };

  return (
    showLoadingScreen && (
      <div className="fixed top-0 left-0 h-full w-full z-50">
        {/* logo fadeout */}
        <div className="absolute top-0 left-0 right-0 h-full w-full flex">
          <motion.div
            animate={{ opacity: 0, scale: 10 }}
            transition={{
              ease: "easeIn",
              duration: 0.8,
              delay: 5,
            }}
            onAnimationComplete={handleAnimationEnd}
            className="absolute top-0 left-0 right-0 h-full w-full bg-gray-200 flex justify-center items-center"
          >
            <div className="animate-pulse-fast">
              <AppLogo isLoadingScreen={true} />
            </div>
          </motion.div>
        </div>
        {/*opening black */}
        <div
          id="opening-black"
          className="absolute top-0 left-0 right-0 h-full w-full flex"
        >
          <motion.div
            initial={{ x: "0%", opacity: 1 }}
            animate={{ x: "-100%", opacity: 0 }}
            transition={{
              x: { duration: 1.5, delay: 1, ease: "easeIn" },
              opacity: {
                duration: 0.4,
                delay: 2.1,
                ease: "linear",
              },
            }}
            className="h-full w-full bg-zinc-900"
          ></motion.div>
          <motion.div
            initial={{ x: "0%", opacity: 1 }}
            animate={{ x: "100%", opacity: 0 }}
            transition={{
              x: { duration: 1.5, delay: 1, ease: "easeIn" },
              opacity: {
                duration: 0.4,
                delay: 2.1,
                ease: "linear",
              },
            }}
            className="h-full w-full bg-zinc-900"
          ></motion.div>
        </div>
      </div>
    )
  );
};

export default LoadingScreen;
