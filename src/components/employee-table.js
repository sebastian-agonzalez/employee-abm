'use client';
import { useEmployees } from '@/services/apollo-service';

const EmployeeTable = () => {
    const { loading, error, data } = useEmployees();
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (data) console.log(data);


    return data.getEmployeesData.data.employees.map(({ id, name, lastname }) => (
        <div key={id}>
            <h2>{id}</h2>
            <h3>{name}</h3>
            <h4>{lastname}</h4>
        </div>
    ));
}

export default EmployeeTable;



