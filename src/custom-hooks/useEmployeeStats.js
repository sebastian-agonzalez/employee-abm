
// import { useEffect } from 'react';
// import { useActiveWorkforce, useCurrentWorkforce, usePendingEmployees } from '@/services/apollo-service';
// import { useContext } from 'react';
// import { EmployeeDataContext } from '@/context/employeesDataContext';

// const useEmployeeStats = () => {
//     const { contextState, updateContext } = useContext(EmployeeDataContext);
//     const activeWorkForceResult = useActiveWorkforce();
//     const currentWorkforceResult = useCurrentWorkforce();
//     const pendingEmployeesResult = usePendingEmployees()

//     useEffect(() => {
//         console.log(currentWorkforceResult.data, activeWorkForceResult.data, pendingEmployeesResult.data);
//         if (currentWorkforceResult.data && activeWorkForceResult.data && pendingEmployeesResult.data) {
//             updateContext({
//                 ...contextState,
//                 activeWorkforceCount: activeWorkForceResult.data.activeEmployeesCount.resultCount,
//                 currentWorkforceCount: currentWorkforceResult.data.currentEmployeesCount.resultCount,
//                 pendingEmployeesCount: pendingEmployeesResult.data.pendingEmployeesCount.resultCount,
//             });
//         }
//     }, [currentWorkforceResult, activeWorkForceResult, pendingEmployeesResult]);

//     return {
//         activeWorkForceResult,
//         currentWorkforceResult,
//         pendingEmployeesResult,
//     };
// };

// export default useEmployeeStats;


////////////////////////////////////////////

import { EmployeeDataContext } from "@/context/employeesDataContext";
import { useContext, useEffect, useMemo } from "react";
import { useActiveWorkforce, useCurrentWorkforce, usePendingEmployees } from '@/services/apollo-service';

export const useEmployeeStats = (id) => {
    const { contextState, updateContext } = useContext(EmployeeDataContext);

    const [fetchActiveWorkforce, { data: dataActiveWorkforce }] = useActiveWorkforce('withLazy');
    const [fetchCurrentWorkforce, { data: dataCurrentWorkforce }] = useCurrentWorkforce('withLazy');
    const [fetchPendingEmployees, { data: dataPendingEmployees }] = usePendingEmployees('withLazy');

    // const memoizedEmployeeData = useMemo(() => {
    //     console.log('entra usememo');
    //     return dataActiveWorkforce && dataCurrentWorkforce && dataPendingEmployees ?
    //         {
    //             activeWorkforceCount: dataActiveWorkforce.activeEmployeesCount.resultCount,
    //             currentWorkforceCount: dataCurrentWorkforce.currentEmployeesCount.resultCount,
    //             pendingEmployeesCount: dataPendingEmployees.pendingEmployeesCount.resultCount,
    //         } : null

    // }, [dataActiveWorkforce, dataCurrentWorkforce, dataPendingEmployees]);

    useEffect(() => {
        console.log('useeffect');
        if (dataActiveWorkforce && dataCurrentWorkforce && dataPendingEmployees) {
            console.log('entra if ');
            updateContext({
                ...contextState,
                ...{
                    activeWorkforceCount: dataActiveWorkforce.activeEmployeesCount.resultCount,
                    currentWorkforceCount: dataCurrentWorkforce.currentEmployeesCount.resultCount,
                    pendingEmployeesCount: dataPendingEmployees.pendingEmployeesCount.resultCount,
                }
            });
        }
    }, [dataActiveWorkforce, dataCurrentWorkforce, dataPendingEmployees]);

    // useEffect(() => {
    //     if (memoizedEmployeeData) {
    //         console.log('entra useeeffect');
    //         updateContext({
    //             ...contextState,
    //             ...memoizedEmployeeData
    //         });
    //     }
    // }, [memoizedEmployeeData]);
    // console.log('entra hook stats');

    return { fetchActiveWorkforce, fetchCurrentWorkforce, fetchPendingEmployees }
}

export default useEmployeeStats;
