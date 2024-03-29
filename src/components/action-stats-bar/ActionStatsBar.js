import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import { ROUTES } from "@/variables/routes";
import { usePathname, useRouter } from "next/navigation";
import useAppStore from "@/state/store";

import { FiArrowLeftCircle, FiPlusCircle, FiRefreshCw, FiXCircle } from 'react-icons/fi';

const ActionStatsBar = () => {
    const router = useRouter();
    const pathName = usePathname();
    const { activeCount, pendingCount, resetStatsCount } = useAppStore();

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
                return (<button onClick={() => router.push(ROUTES.create)} type="button" className="flex items-center justify-between text-white et-bg-gradient focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                    <span>Add </span>
                    <span className="ml-2"><FiPlusCircle size={20} /></span>
                </button>)
        }
    }

    return (
        <div className="mx-8 pt-4 flex justify-between">
            <div className="flex justify-between w-full">
                <div className="flex ">
                    <button className="cursor-default inline-flex items-center text-start justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-pink-500 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className="relative flex justify-center items-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Active Workforce:
                            <span className="flex justify-center items-center w-4 h-4 ml-1">
                                {activeCount ?
                                    <p>{activeCount}</p>
                                    : <LoadingSpinner size={4} />}
                            </span>
                        </span>
                    </button>
                    <button className="cursor-default inline-flex items-center text-start justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-pink-500 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className="flex justify-center items-center text-start px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Pending Registration:
                            <span className="flex justify-center items-center w-4 h-4 ml-1">
                                {pendingCount ?
                                    <p>{pendingCount}</p>
                                    : <LoadingSpinner size={4} />}
                            </span>
                        </span>
                    </button>
                    <button onClick={resetStatsCount} type="button" className="flex items-center justify-between text-white et-bg-gradient focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-3 text-center mb-2">
                        <span>Refresh </span>
                        <span className="ml-2"><FiRefreshCw size={20} /></span>
                    </button>
                </div>
                <div className="flex ml-2">
                    {buttonBuilder(pathName)}
                </div>
            </div>
            <div className="flex">

            </div>
        </div >
    )
}

export default ActionStatsBar;