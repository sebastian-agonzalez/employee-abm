'use client';
import { EmployeeBar } from '@/components/employee-bar/employee-bar';
import EmployeeTable from '@/components/employees-table/employees-table';
import { useActiveWorkforce, useCurrentWorkforce } from '@/services/apollo-service';

export default function Home() {
    const activeWorkForceResult = useActiveWorkforce();
    const currentWorkforceResult = useCurrentWorkforce();
    if( currentWorkforceResult.data) console.log(currentWorkforceResult.data)
    if( currentWorkforceResult.data) console.log(currentWorkforceResult.data)

    return (
        <section className='h-full'>
            <EmployeeBar></EmployeeBar>
            <EmployeeTable></EmployeeTable>
        </section>
    )
}
