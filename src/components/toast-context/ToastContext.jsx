"use client";
import { CustomToast } from "@/components";
import { ToastNotificationContext } from "@/context/ToastNotificationContext";
import { useContext } from "react";

const ToastContext = ({ children }) => {
  const { contextState: toastData, updateContext: setToastData } = useContext(
    ToastNotificationContext
  );

  return (
    <>
      {children}
      {toastData?.show && (
        <CustomToast
          setToastData={setToastData}
          mode={toastData.mode}
          message={toastData.message}
        ></CustomToast>
      )}
    </>
  );
};

export default ToastContext;
