import { fetchEmployeeData } from '@/services/apollo-service';
import { create } from 'zustand';

const useAppStore = create((set) => ({
    employeesData: undefined,
    loadingEmployees: false,
    employeeData: undefined,
    currentCount: undefined,
    activeCount: null,
    pendingCount: null,
    // setEmployeesData: (data) => set({ employeesData: data }),
    setEmployeesData: async () => {
        set({ loadingEmployees: true });
        const response = await fetchEmployeeData();
        set({ employeesData: response.data })
        set({ loadingEmployees: false });
    },
    setEmployeeData: (data) => set({ employeeData: data }),
    setCurrentCount: (data) => set({ currentCount: data }),
    setActiveCount: (data) => set({ activeCount: data }),
    setPendingCount: (data) => set({ pendingCount: data }),
    resetStatsCount: () => {
        set({ employeesData: undefined })
        set({ currentCount: null });
        set({ activeCount: null });
        set({ pendingCount: null });
    }
}));

export default useAppStore