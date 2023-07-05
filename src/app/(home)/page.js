'use client';
import { CardLoadingSpinner } from '@/components';
import EmployeesTable from '@/components/employees-table/EmployeesTable';
import { fetchEmployeeData } from '@/services/apollo-service';
import useAppStore from '@/state/store';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const setEmployeesData = useAppStore((state) => (state.setEmployeesData));
    const employeesData = useAppStore((state) => (state.employeesData));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!employeesData) {
            setLoading(true);
            (async () => {
                const response = await fetchEmployeeData();
                setEmployeesData(response.data);
                setLoading(false);
            })();
        }
    }, [employeesData]);

    if (loading) return (<div className="flex h-full items-start justify-center w-full">
        <CardLoadingSpinner />
    </div>);

    // if (error) return (
    //     <div className="flex justify-center items-center">
    //         <h2>There's been an error loading the data.</h2>
    //     </div>);
    // let data;
    return (
        <div className='h-full w-full py-5 overflow-hidden'>
            <EmployeesTable data={employeesData}></EmployeesTable>
        </div>
    )
}
