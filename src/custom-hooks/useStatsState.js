import useAppStore from '@/state/store';
//custom hook for stats related state
const useStatsState = () => {
    const currentCount = useAppStore((state) => (state.currentCount));
    const setCurrentCount = useAppStore((state) => (state.setCurrentCount));
    const activeCount = useAppStore((state) => (state.activeCount));
    const setActiveCount = useAppStore((state) => (state.setActiveCount));
    const pendingCount = useAppStore((state) => (state.pendingCount));
    const setPendingCount = useAppStore((state) => (state.setPendingCount));
    const resetStatsCount = useAppStore((state) => (state.resetStatsCount));

    return {
        currentCount,
        setCurrentCount,
        activeCount,
        setActiveCount,
        pendingCount,
        setPendingCount,
        resetStatsCount
    };
}

export default useStatsState;