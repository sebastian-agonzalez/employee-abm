'use client';
import EmployeeView from "@/components/employee-view/EmployeeView";
import useEmployeeData from "@/custom-hooks/useEmployeeData";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const EmployeeShowPage = () => {
    let employee;
    const params = useParams();
    const [fetchEmployee, { loading, error, data }] = useEmployeeData(params.id);

    useEffect(() => {
        fetchEmployee();
    }, [])

    if (data) employee = data.employeeData.employee;

    return (
            <EmployeeView employee={employee} error={error} loading={loading} />
    );
}

export default EmployeeShowPage;