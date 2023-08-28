"use client";
import { ActionStatsBar, CustomToast, Header } from "@/components";
import { ToastNotificationContext } from "@/context/ToastNotificationContext";
import useStatsState from "@/custom-hooks/useStatsState";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineRotateLeft } from "react-icons/ai";
import AppLogo from "@/components/app-logo/app-logo";

export default function HomeLayout({ children }) {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const {
    currentCount,
    setCurrentCount,
    activeCount,
    setActiveCount,
    pendingCount,
    setPendingCount,
  } = useStatsState();

  const { contextState: toastData, updateContext: setToastData } = useContext(
    ToastNotificationContext
  );

  const handleAnimationEnd = () => {
    setTimeout(() => {
      setShowLoadingScreen(false);
    }, 500);
  };

  useEffect(() => {
    if (!currentCount) {
      setCurrentCount();
    }
  }, [currentCount]);

  useEffect(() => {
    if (!activeCount) {
      setActiveCount();
    }
  }, [activeCount]);

  useEffect(() => {
    if (!pendingCount) {
      setPendingCount();
    }
  }, [pendingCount]);

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        {/*  */}
        <div
          id="portrait-placeholder"
          className={
            "flex justify-center items-center w-full h-screen absolute top-0 left-0 right-0"
          }
        >
          <div className="rotate-90 text-center animate-pulse">
            <AppLogo />
            <div className="my-4"></div>
            <p className="text-xl">
              Rotate screen to use app{" "}
              <AiOutlineRotateLeft className="inline"></AiOutlineRotateLeft>
            </p>
          </div>
        </div>
        {/*  */}
        <div
          id="app-content"
          className="flex-col h-screen absolute top-0 left-0 right-0"
        >
          <Header></Header>
          <main className="flex-1 my-1 bg-gradient-to-r from-pink-200 to-blue-200 flex flex-col">
            <section className="bg-white">
              <ActionStatsBar></ActionStatsBar>
            </section>
            <section className="grid-bg flex-1">
              <div className="my-6"></div>
              <div className="pb-10">{children}</div>
            </section>
            {toastData?.show && (
              <CustomToast
                setToastData={setToastData}
                mode={toastData.mode}
                message={toastData.message}
              ></CustomToast>
            )}
          </main>
        </div>
        {/*  */}
        {showLoadingScreen && (
          <>
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
          </>
        )}
      </div>
    </>
  );
}
