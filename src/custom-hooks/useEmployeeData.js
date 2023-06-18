
import { useEffect } from 'react';
import { useActiveWorkforce, useCurrentWorkforce, usePendingEmployees } from '@/services/apollo-service';
import { useContext } from 'react';
import { EmployeeDataContext } from '@/context/employeesDataContext';

const useEmployeeData = () => {
    const { contextState, updateContext } = useContext(EmployeeDataContext);
    const activeWorkForceResult = useActiveWorkforce();
    const currentWorkforceResult = useCurrentWorkforce();
    const pendingEmployeesResult = usePendingEmployees()

    useEffect(() => {
        if (currentWorkforceResult.data && activeWorkForceResult.data && pendingEmployeesResult.data) {
            updateContext({
                ...contextState,
                activeWorkforceCount: activeWorkForceResult.data.activeEmployeesCount.resultCount,
                currentWorkforceCount: currentWorkforceResult.data.currentEmployeesCount.resultCount,
                pendingEmployeesCount: pendingEmployeesResult.data.pendingEmployeesCount.resultCount,
            });
        }
    }, [currentWorkforceResult.data, activeWorkForceResult.data, pendingEmployeesResult.data]);

    return {
        activeWorkForceResult,
        currentWorkforceResult,
        pendingEmployeesResult,
    };
};

export default useEmployeeData;
