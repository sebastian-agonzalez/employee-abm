"use client";

import { useContext, useEffect } from "react";
import useStatsState from "@/custom-hooks/useStatsState";

import {
  ActionStatsBar,
  CustomToast,
  Header,
  AppLogo,
  LoadingScreen,
} from "@/components";

import { ToastNotificationContext } from "@/context/ToastNotificationContext";

import { AiOutlineRotateLeft } from "react-icons/ai";

export default function HomeLayout({ children }) {
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
      {/*  */}
      <div
        id="portrait-placeholder"
        className={"flex justify-center items-center w-full h-screen"}
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
      <div id="app-content" className="flex-col h-screen">
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
      <LoadingScreen />
    </>
  );
}
