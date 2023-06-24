'use client';
import { EmployeeBar } from '@/components/employee-bar/employee-bar';
import { Header } from '@/components/main-header/header';
import useEmployeeData from '@/custom-hooks/useEmployeeData';

export default function HomeLayout({ children }) {
    useEmployeeData();
    return (
        <>
            <Header></Header>
            <main className='h-full my-1 bg-gradient-to-r from-pink-200 to-blue-200 flex flex-col' >
                <section className='bg-white'>
                    <EmployeeBar></EmployeeBar>
                </section>
                <section className='grid-bg flex-1'>
                    <div className='my-6 py-2'>
                        {children}
                    </div>
                </section>
            </main>
        </>
    )
}
