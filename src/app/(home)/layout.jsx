"use client";
import { ActionStatsBar, CustomToast, Header } from "@/components";
import { ToastNotificationContext } from "@/context/ToastNotificationContext";
import useStatsState from "@/custom-hooks/useStatsState";
import { useContext, useEffect } from "react";
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

  // useEffect(() => {
  //     console.log('úsafect');
  //     window.addEventListener('orientationchange', () => {
  //         console.log(`The orientation of the screen is: ${window.orientation}`);
  //     });
  // }, [])

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
      <div
        id="portrait-placeholder"
        className={"flex justify-center items-center w-full h-screen"}
      >
        <div className="rotate-90 text-center animate-pulse">
          <p translate="no" className={`text-4xl font-extrabold gradient-text`}>
            StaffTracker
          </p>
          <div className="my-4"></div>
          <p className="text-xl">
            Rotate screen to use app{" "}
            <AiOutlineRotateLeft className="inline"></AiOutlineRotateLeft>
          </p>
        </div>
      </div>
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
    </>
  );
}
