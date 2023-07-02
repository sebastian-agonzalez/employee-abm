'use client';
import { CustomToast, EmployeeBar, Header } from '@/components';
import useEmployeeStats from '@/custom-hooks/useEmployeeStats';
import { ToastNotificationContext } from '@/context/ToastNotificationContext';
import { useContext } from 'react';

export default function HomeLayout({ children }) {
    const { contextState: toastData, updateContext: setToastData } = useContext(ToastNotificationContext);
    //console.log(toastData);
    useEmployeeStats();
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
