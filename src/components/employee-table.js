'use client';
import { useEmployees } from '@/services/apollo-service';
import Link from 'next/link';

const EmployeeTable = () => {
    const { loading, error, data } = useEmployees();
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (data) console.log(data);


    return data.getEmployeesData.data.employees.map(({ id, name, lastname }) => (
        <div>
            <Link href={`/employees/${id}`}>{id}</Link>
            <p>{name}</p>
            <p>{lastname}</p>
        </div>
    ));
}

export default EmployeeTable;



