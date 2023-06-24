'use client';
import EmployeeView from "@/components/employee-view/employeeView";
import { LoadingSpinner } from "@/components/loading-spinner/spinner";
import { useEmployee } from "@/services/apollo-service";
import { useParams } from "next/navigation";

const EmployeeShow = () => {
    let employee;
    const params = useParams();
    const { loading, error, data } = useEmployee(params.id);
    if (error) console.log(error.message);
    if (data) employee = data.employeeData.employee;

    return (
        <>
            {loading && <LoadingSpinner></LoadingSpinner>}
            <EmployeeView employee={employee} error={error} />
        </>
    );
}

export default EmployeeShow;