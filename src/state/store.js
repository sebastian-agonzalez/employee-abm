import { create } from 'zustand';

const useAppStore = create((set) => ({
    employeesData: undefined,
    employeeData: undefined,
    currentCount: undefined,
    activeCount: null,
    pendingCount: null,
    setEmployeesData: (data) => set({ employeesData: data }),
    setEmployeeData: (data) => set({ employeeData: data }),
    setCurrentCount: (data) => set({ currentCount: data }),
    setActiveCount: (data) => set({ activeCount: data }),
    setPendingCount: (data) => set({ pendingCount: data })
}));

export default useAppStore