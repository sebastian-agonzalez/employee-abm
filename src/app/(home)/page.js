'use client';

import EmployeeTable from '@/components/employees-table/employees-table';

export default function HomePage() {
    return (
        <div className='py-5'>
            <EmployeeTable></EmployeeTable>
        </div>
    )
}
