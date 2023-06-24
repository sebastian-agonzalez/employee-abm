import { HiExclamation } from 'react-icons/hi';

const EmployeeView = ({ employee, error }) => {
    console.log('employee view', employee);
    const dateSectionClasses = "relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100";

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-2xl">
                <div className="my-3 p-8 card-shadow bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                    {error &&
                        <div className="flex justify-center items-center">
                            <h2>There's been a problem loading the data.</h2>
                        </div>
                    }
                    {
                        employee && <div>
                            <article class="flex max-w-xl flex-col items-start justify-between">
                                <div class="relative mb-6 flex items-center gap-x-8">
                                    <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-24 w-24 rounded-full bg-gray-50" />
                                    <div class="text-3xl leading-10">
                                        <p class="font-semibold text-gray-900">
                                            <span class="absolute inset-0 "></span>
                                            {employee.name ? employee.name : '[Pending}'} {employee.lastname ? employee.lastname : '[Pending]'}
                                        </p>
                                        <p class="text-gray-600 text-xl">{employee.area ? employee.area : "Area: Pending"}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-x-4 text-sm my-3">
                                    <span>Begin Date: </span>
                                    {
                                        employee.beginDate ? <time className={dateSectionClasses} datetime={employee.beginDate}>{employee.beginDate}</time>
                                            : <p className={dateSectionClasses}>Pending</p>
                                    }
                                    <span>End Date: </span>
                                    {
                                        employee.endDate ? <time className={dateSectionClasses} datetime={employee.endDate}>{employee.endDate}</time>
                                            : <p className={dateSectionClasses}>Pending</p>
                                    }
                                </div>
                                <div class="group relative my-3">
                                    <p class="mt-3 font-medium leading-6 text-gray-900 group-hover:text-gray-600">
                                        <span class="absolute inset-0"></span>
                                        Employee ID: {employee.id}
                                    </p>
                                </div>
                                {employee.registrationStatus &&
                                    <div className='flex justify-start items-center mt-4 gap-4 text-orange-500 dark:bg-orange-700 dark:text-orange-200'>
                                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 ">
                                            <HiExclamation className="h-5 w-5" />
                                        </div> <p class="line-clamp-3 text-sm leading-6">Information on this profile is pending</p>
                                    </div>}

                            </article>
                        </div>
                    }
                </div>
            </div >
        </div >
    );
}

export default EmployeeView;