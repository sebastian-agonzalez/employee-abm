'use client';
import { CardLoadingSpinner } from '@/components';
import EmployeesTable from '@/components/employees-table/EmployeesTable';
import useAppStore from '@/state/store';
import { useEffect } from 'react';

export default function HomePage() {
    const { setEmployeesData, employeesData, loadingEmployees } = useAppStore();

    useEffect(() => {
        setEmployeesData();
    }, []);

    if (loadingEmployees || employeesData === undefined) return (<div className="flex h-full items-start justify-center w-full">
        <CardLoadingSpinner />
    </div>);

    return (
        <div className='h-full w-full py-5 overflow-hidden'>
            <EmployeesTable data={employeesData}></EmployeesTable>
        </div>
    )
}
