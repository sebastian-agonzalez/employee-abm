'use client';

import { Toast } from 'flowbite-react';
import { HiExclamation, HiX, HiCheck } from 'react-icons/hi'

export const TOAST_MODE = Object.freeze({
    success: "success",
    error: "error",
    warning: "warning"
},)

export default function CustomToast({ mode, message, setToastData }) {

    setTimeout(() => {
        setToastData({ show: false });
    }, 6000);

    return (
        <div className="flex flex-col gap-4 fixed bottom-3 right-3 z-50 shadow-md">
            <Toast>
                {mode === TOAST_MODE.success && <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                    <HiCheck className="h-5 w-5" />
                </div>}

                {mode === TOAST_MODE.error && <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                    <HiX className="h-5 w-5" />
                </div>}
                {mode === TOAST_MODE.warning && <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                    <HiExclamation className="h-5 w-5" />
                </div>}
                <div className="ml-3 text-sm font-normal">
                    {message}
                </div>
                <Toast.Toggle />
            </Toast>
        </div >
    )
}


