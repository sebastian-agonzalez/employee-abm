import { EmployeeDataContext } from "@/context/employeesDataContext";
import { useEmployee } from "@/services/apollo-service";
import { useContext, useEffect, useMemo } from "react";

export const useEmployeeData = (id) => {
    const { contextState, updateContext } = useContext(EmployeeDataContext);
    const [fetchEmployee, { loading, error, data }] = useEmployee(id, 'withLazy');
    // if (data) updateContext({
    //     ...contextState,
    //     employeeData: data.employeeData.employee
    // });

    const memoizedEmployeeData = useMemo(() => {
        console.log('entra usememo');
        console.log(data ? data.employeeData.employee : null);
        return data ? data.employeeData.employee : null;
    }, [data]);

    useEffect(() => {
        console.log('entra useeffect');
        if (memoizedEmployeeData) {
            updateContext({
                ...contextState,
                employeeData: memoizedEmployeeData
            });
        }
    }, [memoizedEmployeeData]);

    return [fetchEmployee, { loading, error, data }]
}

export default useEmployeeData;