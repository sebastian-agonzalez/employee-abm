'use client';
import { useEmployees } from '@/services/apollo-service';
import EmployeesData from '@/services/models/employees-data';
import Link from 'next/link';
import { ArrowRight } from 'react-feather';
import { LoadingSpinner } from '../loading-spinner/spinner';

const applyStatusColor = (code) => {
    switch (code) {
        case "PENDING":
            return 'warning';
        case "COMPLETED":
            return 'success';
        default:
            break;
    }
}

const EmployeeTable = () => {
    let employees;
    let { loading, error, data } = useEmployees();

    if (loading) return (
        <div className='flex justify-center align-middle w-f h-full'>
            <LoadingSpinner size={20} />
        </div>)
    if (error) return <p>Error : {error.message}</p>;
    if (data) {
        employees = new EmployeesData(data.getEmployeesData.data.employees).getData();
    }

    return employees && (
        <>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-8">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="bg-gradient-to-r from-blue-500 to-pink-700 bg-opacity-10 text-xs text-white uppercase">
                        <tr>
                            <th scope="col text-blue" className="px-6 py-3">
                                Registration
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3" style={{ width: '40px' }}>
                                Employee ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Begin Data
                            </th>
                            <th scope="col" className="px-6 py-3">
                                End Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Area
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(({ id, name, lastname, beginDate, endDate, registrationStatus, area }, i) => (
                                <tr key={i} className={i === (employees.length - 1) ? "bg-white dark:bg-gray-800" : "bg-white border-b dark:bg-gray-800 dark:border-gray-700"}>
                                    <td className={"px-6 py-4 text-" + applyStatusColor(registrationStatus)}>
                                        <p>{registrationStatus}</p>
                                    </td>
                                    <td className="px-6 py-4 overflow-hidden" style={{ width: '40px' }}>
                                        <p data-tooltip-target="tooltip-animation" className='line-clamp-2'>{id}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p>{name}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p>{lastname}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p>{beginDate}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p>{endDate ? endDate : 'Active'}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p>{area}</p>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex justify-center">
                                            <Link href={`/employees/${id}`}>
                                                <ArrowRight color='blue' size={20} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr >

                            ))
                        }
                    </tbody>
                </table>
            </div>


        </>)

}

export default EmployeeTable;


