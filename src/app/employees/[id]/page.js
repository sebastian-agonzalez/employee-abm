'use client';
import { useEmployee } from "@/services/apollo-service";
import { useParams } from "next/navigation";

const EmployeeShow = () => {
    const params = useParams();
    const { loading, error, data } = useEmployee(params.id);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    //if (data) console.log(data);

    return (
        <>
            <p>{params.id}</p>
            <div>employee show</div>
        </>
    );
}

export default EmployeeShow;