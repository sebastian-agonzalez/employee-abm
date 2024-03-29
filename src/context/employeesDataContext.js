'use client'
import { createContext, useState } from 'react';

export const EmployeeDataContext = createContext();

const EmployeeDataContextProvider = ({ children }) => {
    const employeesData = {
        activeWorkforceCount: null,
        currentWorkforceCount: null,
        pendingRegEmployees: null,
        employeeData: null,
    }

    const [contextState, setContextState] = useState(employeesData);

    const updateContext = (newValue) => {
        setContextState({
            ...contextState,
            ...newValue,
        });
    };

    return (
        <EmployeeDataContext.Provider value={{ contextState, updateContext }}>
            {children}
        </EmployeeDataContext.Provider>
    );
};

export default EmployeeDataContextProvider;