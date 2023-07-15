'use client';
import { CustomToast, EmployeeBar, Header } from '@/components';
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
            (async () => {
                const response = await fetchCurrentEmployeesCount();
                //console.log('current', response);
                setCurrentCount(response.data.currentEmployeesCount.resultCount)
            })();
        }
    }, [currentCount]);

    useEffect(() => {
        if (!activeCount) {
            (async () => {
                const response = await fetchActiveEmployeesCount();
                //console.log('active', response);
                setActiveCount(response.data.activeEmployeesCount.resultCount)
            })();
        }
    }, [activeCount]);

    useEffect(() => {
        if (!pendingCount) {
            (async () => {
                const response = await fetchPendingEmployeesCount();
                //console.log('pending', response);
                setPendingCount(response.data.pendingEmployeesCount.resultCount)
            })();
        }
    }, [pendingCount]);

    return (
        <>
            <Header></Header>
            <main className='h-full my-1 bg-gradient-to-r from-pink-200 to-blue-200 flex flex-col' >
                <section className='bg-white'>
                    <EmployeeBar></EmployeeBar>
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
