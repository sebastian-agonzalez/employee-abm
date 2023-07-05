import { EmployeeDataContext } from "@/context/employeesDataContext";
import { useEmployee } from "@/services/apollo-service";
import { useContext, useEffect, useMemo } from "react";

export const useEmployeeData = (id) => {
    const { contextState, updateContext } = useContext(EmployeeDataContext);
    const [fetchEmployee, { loading, error, data }] = useEmployee(id, 'withLazy');

    const memoizedEmployeeData = useMemo(() => {
        return data ? data.employeeData.employee : null;
    }, [data]);

    useEffect(() => {
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