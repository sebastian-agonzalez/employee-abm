'use client';
import { GET_EMPLOYEES } from '@/services/apollo-service';
import { useQuery } from '@apollo/client';

const EmployeeTable = () => {
    const { loading, error, data } = useQuery(GET_EMPLOYEES);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return data.employees.map(({ id, name, lastname }) => (
        <div key={id}>
            <h2>{id}</h2>
            <h3>{name}</h3>
            <h4>{lastname}</h4>
        </div>
    ));
}

export default EmployeeTable;



