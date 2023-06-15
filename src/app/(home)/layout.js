'use client';
import { EmployeeBar } from '@/components/employee-bar/employee-bar';
import { Header } from '@/components/main-header/header';
import useEmployeeData from '@/custom-hooks/useEmployeeData';

export default function HomeLayout({ children }) {
    useEmployeeData();
    return (
        <>
            <Header></Header>
            <main className='h-full' >
                <section className='h-full'>
                    <EmployeeBar></EmployeeBar>
                    {children}
                </section>
            </main>
        </>
    )
}
