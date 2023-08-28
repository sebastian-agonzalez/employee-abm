import { fetchActiveEmployeesCount, fetchCurrentEmployeesCount, fetchEmployeeData, fetchPendingEmployeesCount } from '@/services/apollo-service';
import { create } from 'zustand';

const useAppStore = create((set) => ({
    employeesData: undefined,
    loadingEmployees: false,
    employeeData: undefined,
    currentCount: undefined,
    activeCount: null,
    pendingCount: null,
    setEmployeesData: async () => {
        const response = await fetchEmployeeData();
        set({ employeesData: response.data });
    },
    setEmployeeData: (data) => set({ employeeData: data }),
    setCurrentCount: async () => {
        const response = await fetchCurrentEmployeesCount();
        set({ currentCount: response.data.currentEmployeesCount.resultCount });
    },
    setActiveCount: async () => {
        const response = await fetchActiveEmployeesCount();
        set({ activeCount: response.data.activeEmployeesCount.resultCount });
    },
    setPendingCount: async () => {
        const response = await fetchPendingEmployeesCount();
        set({ pendingCount: response.data.pendingEmployeesCount.resultCount });
    },
    resetStatsCount: () => {
        set({ employeesData: undefined })
        set({ currentCount: null });
        set({ activeCount: null });
        set({ pendingCount: null });
    }
}));

export default useAppStore