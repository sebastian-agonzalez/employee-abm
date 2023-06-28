import { EmployeeDataContext } from "@/context/employeesDataContext";
import { useContext } from "react";
import { LoadingSpinner } from "../loading-spinner/spinner";
import { FiArrowLeftCircle, FiPlusCircle, FiXCircle } from 'react-icons/fi';
import { ROUTES } from "@/variables/routes";
import { usePathname, useRouter } from "next/navigation";

export const EmployeeBar = () => {
    const router = useRouter();
    const pathName = usePathname();
    const { contextState } = useContext(EmployeeDataContext);

    const buttonBuilder = (path) => {
        switch (path) {
            case ROUTES.create:
                return (<button onClick={() => router.back()} type="button" className="flex items-center justify-between text-white et-bg-gradient focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                    <span>Cancel </span>
                    <span className="ml-2"><FiXCircle size={20} /></span>
                </button>)
            case path.includes(ROUTES.viewEmployee) ? path : '':
                return (<button onClick={() => router.back()} type="button" className="flex items-center justify-between text-white et-bg-gradient focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                    <span>Go back </span>
                    <span className="ml-2"><FiArrowLeftCircle size={20} /></span>
                </button>)
            default:
                return <button onClick={() => router.push(ROUTES.create)} type="button" className="flex items-center justify-between text-white et-bg-gradient focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                    <span>Add </span>
                    <span className="ml-2"><FiPlusCircle size={20} /></span>
                </button>
        }
    }

    return (
        <div className="mx-8 pt-4 flex justify-between">
            <div className="flex justify-start">
                <div>
                    <button className="cursor-default relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-pink-500 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className="relative flex justify-center items-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Active Workforce:
                            <span className="flex justify-center items-center w-4 h-4 ml-1">
                                {contextState?.activeWorkforceCount ?
                                    <p>{contextState.activeWorkforceCount}</p>
                                    : <LoadingSpinner size={4} />}
                                {/* {null ?
                                    <p>{contextState.currentWorkforceCount}</p>
                                    : <LoadingSpinner size={4} />} */}
                            </span>
                        </span>
                    </button>
                </div>
                <div>
                    <button className="cursor-default relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-pink-500 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className=" flex justify-center items-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Pending Registration:
                            <span className="flex justify-center items-center w-4 h-4 ml-1">
                                {contextState?.pendingEmployeesCount ?
                                    <p>{contextState.pendingEmployeesCount}</p>
                                    : <LoadingSpinner size={4} />}
                                {/* {null ?
                                    <p>{contextState.pendingEmployeesCount}</p>
                                    : <div className="mx-1"><LoadingSpinner size={4} /></div>} */}
                            </span>
                        </span>
                    </button>
                </div>
            </div>
            <div className="flex">
                {buttonBuilder(pathName)}
            </div>
        </div >
    )
}