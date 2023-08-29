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
        <div className="absolute top-0 left-0 right-0 h-full w-full flex">
          <motion.div
            animate={{ opacity: 0 }}
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
        {/*  */}
        <div className="absolute top-0 left-0 right-0 h-full w-full flex">
          <motion.div
            animate={{ x: "-100%", opacity: 0 }}
            transition={{
              ease: "easeOut",
              duration: 1.5,
              delay: 1,
            }}
            className="h-full w-full bg-zinc-900"
          ></motion.div>
          <motion.div
            animate={{ x: "100%", opacity: 0 }}
            transition={{
              ease: "easeOut",
              duration: 1.5,
              delay: 1,
            }}
            className="h-full w-full bg-zinc-900"
          ></motion.div>
        </div>
      </div>
    )
  );
};

export default LoadingScreen;
