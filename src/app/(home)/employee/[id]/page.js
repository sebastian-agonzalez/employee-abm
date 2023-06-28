'use client';
import EmployeeView from "@/components/employee-view/employeeView";
import { useEmployee } from "@/services/apollo-service";
import { useParams } from "next/navigation";

const EmployeeShow = () => {
    let employee;
    const params = useParams();
    const { loading, error, data } = useEmployee(params.id);
    if (error) console.log(error);
    if (data) employee = data.employeeData.employee;
    console.log('data', data);

    return (
        <>
            <EmployeeView employee={employee} error={error} loading={loading} />
        </>
    );
}

export default EmployeeShow;