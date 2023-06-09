'use client';
import { EmployeeBar } from '@/components/employee-bar/employee-bar';
import EmployeeTable from '@/components/employees-table/employees-table';
import { EmployeeDataContext } from '@/context/employeesDataContext';
import { Header } from '@/components/main-header/header';
import { useActiveWorkforce, useCurrentWorkforce, usePendingEmployees } from '@/services/apollo-service';
import { useContext, useEffect } from 'react';

export default function Home() {

    const { contextState, updateContext } = useContext(EmployeeDataContext);
    console.log('contextstate', contextState);

    const activeWorkForceResult = useActiveWorkforce();
    const currentWorkforceResult = useCurrentWorkforce();
    const pendingEmployeesResult = usePendingEmployees();

    useEffect(() => {
        if (currentWorkforceResult.data && activeWorkForceResult.data && pendingEmployeesResult.data) {
            console.log('entra', currentWorkforceResult.data.getCurrentEmployeesCount.resultCount);
            console.log(activeWorkForceResult.data);
            updateContext({
                ...contextState,
                activeWorkforceCount: activeWorkForceResult.data.getActiveEmployeesCount.resultCount,
                currentWorkforceCount: currentWorkforceResult.data.getCurrentEmployeesCount.resultCount,
                pendingEmployeesCount: pendingEmployeesResult.data.getPendingEmployeesCount.resultCount,
            });
        }
    }, [currentWorkforceResult.data, activeWorkForceResult.data, pendingEmployeesResult.data]);

    return (
        <>
            <Header></Header>
            <main className='h-full' >
                <section className='h-full'>
                    <EmployeeBar></EmployeeBar>
                    <EmployeeTable></EmployeeTable>
                </section>
            </main>
        </>
    )
}
