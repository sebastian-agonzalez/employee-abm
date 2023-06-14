import { EmployeeDataContext } from '@/context/employeesDataContext';
import Link from 'next/link';
import { useContext } from 'react';
import styles from './header.module.css';
import { LoadingSpinner } from '../loading-spinner/spinner';
import { Avatar } from 'flowbite-react';

export const Header = () => {
    const { contextState } = useContext(EmployeeDataContext);
    //console.log('header', contextState);

    return (
        <header className={`${styles['header-main']} pt-3 px-4 bg-transparent rounded-b rounded-lg`}>
            <nav className=" border-gray-200 dark:bg-gray-900">
                <div className="flex items-center justify-between mx-auto p-4">
                    <div className='flex w-1/5 justify-start'>
                        <Link href="/" className="flex items-center">
                            <p className={`text-3xl font-bold ${styles['gradient-text']}`} >EmployeeTracker</p>
                        </Link>
                    </div>
                    <div className='flex w-1/5 justify-start'>
                    </div>
                    <div className='flex w-1/5 justify-start'>
                    </div>
                    <div className="w-1/5 flex items-center justify-end md:order-2"> 
                        <button type="button" className="flex mr-3 text-smrounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                            <Avatar rounded />
                        </button>

                        <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                </li>
                            </ul>
                        </div>
                        <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <Avatar rounded />
                        </button>
                    </div>
                    <div className="w-1/5 mx-4 flex items-center justify-end md:order-1" id="mobile-menu-2">
                        <ul className="flex font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <div className="flex items-center">
                                    <span className="mr-2 py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">
                                        Actual Workforce:</span>
                                    <div className='w-4 h-4 flex items-center'>
                                        {contextState.currentWorkforceCount ?
                                            <p>{contextState.currentWorkforceCount}</p>
                                            : <LoadingSpinner size={4} />}
                                    </div>

                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header >)
}