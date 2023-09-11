import { fetchActiveEmployeesCount, fetchCurrentEmployeesCount, fetchEmployeeData, fetchPendingEmployeesCount } from '@/services/apollo-service';
import { create } from 'zustand';

const useAppStore = create((set, get) => ({
    employeesData: undefined,
    loadingEmployees: false,
    employeeData: undefined,
    currentCount: undefined,
    activeCount: null,
    pendingCount: null,
    setEmployeesData: async () => {
        if (!(get().employeesData)) {
            const res = await fetchEmployeeData()
            set({ employeesData: res.data });
        }
    },
    setEmployeeData: (data) => set({ employeeData: data }),
    setCurrentCount: async () => {
        if (!(get().currentEmployeesCount)) {
            const response = await fetchCurrentEmployeesCount();
            set({ currentCount: response.data.currentEmployeesCount.resultCount });
        }
    },
    setActiveCount: async () => {
        if (!(get().activeEmployeesCount)) {
            const response = await fetchActiveEmployeesCount();
            set({ activeCount: response.data.activeEmployeesCount.resultCount });
        }
    },
    setPendingCount: async () => {
        if (!(get().pendingEmployeesCount)) {
            const response = await fetchPendingEmployeesCount();
            set({ pendingCount: response.data.pendingEmployeesCount.resultCount });
        }
    },
    setCountStats: () => (get().setCurrentCount(), get().setActiveCount(), get().setPendingCount()),
    resetStatsCount: () => {
        set({ employeesData: undefined })
        set({ currentCount: null });
        set({ activeCount: null });
        set({ pendingCount: null });
        get().setEmployeesData(); get().setCountStats();
    }
}));

export default useAppStore