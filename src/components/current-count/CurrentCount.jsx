"use client";
import useAppStore from "@/state/store";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";

const CurrentCount = () => {
  const currentCount = useAppStore((state) => state.currentCount);

  return (
    <div className="flex font-medium px-4 pt-2 rounded-lg items-center">
      <span className="md:mx-1 text-blue-700" aria-current="page">
        Current Workforce:
      </span>
      <div className="w-4 h-4 flex items-center px-2">
        {currentCount ? <p>{currentCount}</p> : <LoadingSpinner size={4} />}
      </div>
    </div>
  );
};

export default CurrentCount;
