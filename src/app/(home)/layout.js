'use client';
import { EmployeeBar } from '@/components/employee-bar/employee-bar';
import EmployeeTable from '@/components/employees-table/employees-table';
import { EmployeeDataContext } from '@/context/employeesDataContext';
import { Header } from '@/components/main-header/header';
import { useActiveWorkforce, useCurrentWorkforce, usePendingEmployees } from '@/services/apollo-service';
import { useContext, useEffect } from 'react';
import useEmployeeData from '@/custom-hooks/useEmployeeData';

export default function HomeLayout({ children }) {
    //console.log('home layout');
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
