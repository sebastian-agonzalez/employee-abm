'use client';
import { CustomToast, ActionStatsBar, Header } from '@/components';
import { ToastNotificationContext } from '@/context/ToastNotificationContext';
import { useContext, useEffect } from 'react';
import useAppStore from '@/state/store';
import { fetchActiveEmployeesCount, fetchCurrentEmployeesCount, fetchPendingEmployeesCount } from '@/services/apollo-service';

export default function HomeLayout({ children }) {
    const currentCount = useAppStore((state) => (state.currentCount));
    const setCurrentCount = useAppStore((state) => (state.setCurrentCount));
    const activeCount = useAppStore((state) => (state.activeCount));
    const setActiveCount = useAppStore((state) => (state.setActiveCount));
    const pendingCount = useAppStore((state) => (state.pendingCount));
    const setPendingCount = useAppStore((state) => (state.setPendingCount));
    const { contextState: toastData, updateContext: setToastData } = useContext(ToastNotificationContext);

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
            <Header></Header>
            <main className='h-full my-1 bg-gradient-to-r from-pink-200 to-blue-200 flex flex-col' >
                <section className='bg-white'>
                    <ActionStatsBar></ActionStatsBar>
                </section>
                <section className='grid-bg flex-1'>
                    <div className='my-6 py-2 h-full w-full'>
                        {children}
                    </div>
                </section>
                {
                    toastData?.show && <CustomToast setToastData={setToastData} mode={toastData.mode} message={toastData.message}></CustomToast>
                }
            </main>
        </>
    )
}
