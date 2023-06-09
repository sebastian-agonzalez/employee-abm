import { EmployeeDataContext } from "@/context/employeesDataContext";
import { useContext } from "react";
import { LoadingSpinner } from "../loading-spinner/spinner";
import { PlusCircle } from 'react-feather';

export const EmployeeBar = () => {
    const { contextState } = useContext(EmployeeDataContext);

    return (
        <div className="mx-8 mt-8 flex justify-between">
            <div className="flex justify-start">
                <div>
                    <button className="cursor-default relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-pink-500 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className="relative px-4 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            <div className="flex items-center">
                                {/* <span className="py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">
                                    Active workforce:</span> */}
                                <div className="flex items-center">
                                    <span className="mr-2 py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">
                                        Active Workforce:</span>
                                    <div className='w-4 h-4 flex items-center'>
                                        {contextState.activeWorkforceCount ?
                                            <p>{contextState.currentWorkforceCount}</p>
                                            : <LoadingSpinner size={4} />}
                                    </div>
                                </div>
                            </div>
                        </span>
                    </button>
                </div>
                <div>
                    <button className="cursor-default relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-pink-500 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            <div className="flex items-center">
                                {/* <span className="py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">
                                    Active workforce:</span> */}
                                <div className="flex items-center">
                                    <span className="mr-2 py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">
                                        Pending Registration:</span>
                                    <div className='w-4 h-4 flex items-center'>
                                        {contextState.pendingEmployeesCount ?
                                            <p>{contextState.pendingEmployeesCount}</p>
                                            : <LoadingSpinner size={4} />}
                                    </div>
                                </div>
                            </div>
                        </span>
                    </button>
                </div>
                <div>
                    <button className="cursor-default relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-pink-500 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Pending Registration: 24235
                        </span>
                    </button>
                </div>
            </div>
            <div className="flex">
                <button type="button" className="flex items-center justify-between text-white bg-gradient-to-r from-blue-600 to-pink-600 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Add <span className="ml-2"><PlusCircle /></span></button>
            </div>

        </div>)
}