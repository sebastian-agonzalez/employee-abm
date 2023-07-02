'use client'
import { createContext, useState } from 'react';

export const ToastNotificationContext = createContext();

const ToastNotificationContextProvider = ({ children }) => {
    const toastData = {
        show: undefined,
        message: undefined,
        mode: undefined
    };

    const [contextState, setContextState] = useState(toastData);

    const updateContext = (newValue) => {
        setContextState({
            ...contextState,
            ...newValue,
        });
    };

    return (
        <ToastNotificationContext.Provider value={{ contextState, updateContext }}>
            {children}
        </ToastNotificationContext.Provider>
    );
};

export default ToastNotificationContextProvider;