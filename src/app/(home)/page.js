'use client';
import EmployeesTable from '@/components/employees-table/EmployeesTable';

export default function HomePage() {
    return (
        <div className='h-full w-full py-5 overflow-hidden'>
            <EmployeesTable></EmployeesTable>
        </div>
    )
}
