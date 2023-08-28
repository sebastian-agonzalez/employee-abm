'use client';
import { CardLoadingSpinner } from "@/components";
import EmployeeView from "@/components/employee-view/EmployeeView";
import useEmployeeData from "@/custom-hooks/useEmployeeData";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const EmployeeShowPage = () => {
    //always fetch employee data in thei comp
    let employee;
    const params = useParams();
    const [fetchEmployee, { loading, error, data }] = useEmployeeData(params.id);

    useEffect(() => {
        fetchEmployee();
    }, [])

    if (data) employee = data.employeeData.employee;

    return (
        <>
            {(loading || employee === undefined) && (<div className="flex h-full items-start justify-center w-full">
                <CardLoadingSpinner />
            </div>)}
            {(employee === null || error) && (
                <div className="flex justify-center">
                    <div className="w-full max-w-2xl">
                        <div className="my-3 p-8 card-shadow bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                            {error &&
                                <div className="flex justify-center items-center">
                                    <h2>There's been a problem loading the data.</h2>
                                </div>
                            }
                            {employee === null &&
                                <div className="flex justify-center items-center">
                                    <h2>An employee with such ID does not exist.</h2>
                                </div>
                            }
                        </div>
                    </div>
                </div>)
            }
            {employee && <EmployeeView employee={employee} />}
        </>
    );
}

export default EmployeeShowPage;