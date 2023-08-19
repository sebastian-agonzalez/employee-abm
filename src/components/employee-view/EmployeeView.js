import { REGISTRATION_STATUS } from '@/variables/employee';
import { ROUTES } from '@/variables/routes';
import Link from 'next/link';
import { FiEdit3 } from 'react-icons/fi';
import { HiExclamation } from 'react-icons/hi';
import HorizontalRouteAnimator from '../animator/HorizontalRouteAnimator';

const EmployeeView = ({ employee }) => {
    const dateSectionClasses = "relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600";

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-2xl">
                <div className="my-3 p-8 card-shadow bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                    <HorizontalRouteAnimator>
                        <article className="flex flex-col items-start justify-between">
                            <div className="relative w-full mb-6 flex justify-between">
                                <div className='flex justify-start gap-x-8 items-center'>
                                    {/* <Image src={employee.profilePic ?? "https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-picture-default-avatar-photo-placeholder-profile-picture-eps-file-easy-to-edit-125707135.jpg"} alt="" className="h-24 w-24 rounded-full bg-gray-50" fill={true}/> */}
                                    <img src={employee.profilePic ?? "https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-picture-default-avatar-photo-placeholder-profile-picture-eps-file-easy-to-edit-125707135.jpg"} alt="" className="h-24 w-24 rounded-full bg-gray-50" />
                                    <div className="text-3xl leading-10">
                                        <p className="font-semibold text-gray-900">

                                            {employee.name ? employee.name : <span className='text-gray-400'>{'[Pending]'}</span>} {employee.lastname ? employee.lastname : <span className='text-gray-400'>{'[Pending]'}</span>}
                                        </p>
                                        <p className="text-gray-600 text-xl">{employee.area ? employee.area : <span className='text-gray-400'>{"Area: Pending"}</span>}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-gray-100 h-10 hover:bg-gray-300 p-1 transition-all ease-in rounded-full w-10">
                                        <Link href={`${ROUTES.viewEmployee}${employee.id}/edit`}>
                                            <button className='flex h-full items-center justify-center w-full'>
                                                <FiEdit3 color='blue' size={20} />
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                            <div className={"flex items-center gap-x-4 text-sm my-3"}>
                                <span>Begin Date: </span>
                                {
                                    employee.beginDate ? <time className={dateSectionClasses} datetime={employee.beginDate}>{employee.beginDate}</time>
                                        : <p className={dateSectionClasses}>Pending</p>
                                }
                                <span className='mx-4'>|</span>
                                <span>End Date: </span>
                                {
                                    employee.endDate ? <time className={dateSectionClasses} datetime={employee.endDate}>{employee.endDate}</time>
                                        : <span className={'py-1'}><span className={' text-white bg-success ' + dateSectionClasses}>Active</span></span>
                                }
                            </div>
                            <div className="group relative my-3">
                                <p className="mt-3 font-medium leading-6 text-gray-900 group-hover:text-gray-600">
                                    <span className="absolute inset-0"></span>
                                    Employee ID: <span className='mx-2'>{employee.id}</span>
                                </p>
                            </div>
                            {employee.registrationStatus === REGISTRATION_STATUS.pending && <>
                                <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700" />
                                <div className='flex justify-start items-center mt-4 gap-4 text-orange-500 dark:bg-orange-700 dark:text-orange-200'>

                                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 ">
                                        <HiExclamation className="h-5 w-5" />
                                    </div> <p className="line-clamp-3 text-sm leading-6">Information on this profile is pending</p>
                                </div></>}
                        </article>
                    </HorizontalRouteAnimator>
                </div>
            </div >
        </div >
    );
}

export default EmployeeView;