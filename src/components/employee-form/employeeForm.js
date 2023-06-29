'use client'
import { EMPLOYEE_AREA } from '@/variables/employee';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';


export const EmployeeForm = ({ employeeData, resetForm, handleSubmit }) => {

    const formik = useFormik({
        initialValues: {
            firstName: employeeData?.name ?? '',
            lastName: employeeData?.lastname ?? '',
            beginDate: employeeData?.beginDate ? dayjs(employeeData.beginDate) : '',
            endDate: employeeData?.endDate ? dayjs(employeeData.endDate) : '',
            area: employeeData?.area ?? ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(15, 'Must be 20 characters or less')
                .required('Required'),
            area: Yup.string()
        }),
        onSubmit: values => {
            handleSubmit(values);
            //console.log('form values', values);
        },
    });

    useEffect(() => {
        if (resetForm) formik.resetForm();
    }, [resetForm]);

    return (
        <div className="my-3 px-8 pt-4 card-shadow bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <h2 className="inline-block text-3xl font-bold text-primary my-5 gradient-text-reversed">{(employeeData ? 'Edit' : 'New') + ' Employee'}</h2>

            <form onSubmit={formik.handleSubmit}>

                <div className="mb-6">
                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                    <input
                        id="firstName"
                        type="text"
                        {...formik.getFieldProps('firstName')}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                    {formik.errors.firstName && formik.touched.firstName ? <small className='text-red-600'>{formik.errors.firstName}</small> : null}
                    {/* <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" /> */}
                </div>
                <div className="mb-6">
                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                    <input
                        id="lastName"
                        type="text"
                        {...formik.getFieldProps('lastName')}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                    {formik.errors.lastName && formik.touched.lastName ?
                        <small className='text-red-600'>{formik.errors.lastName}</small>
                        : null}
                </div>
                <div className='flex justify-between my-6'>
                    <div className="">
                        <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Begin Date</label>
                        <DatePicker
                            name="beginDate"
                            defaultValue={null}
                            value={formik.values.beginDate}
                            onChange={(value) => {
                                formik.setFieldValue('beginDate', value.format('MM/DD/YYYY'));
                            }}
                        />
                        {formik.errors.beginDate && formik.touched.beginDate ? <small className='text-red-600'>{formik.errors.beginDate}</small> : null}
                    </div>
                    <div className="">
                        <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
                        <DatePicker
                            defaultValue={null}
                            name="endDate"
                            value={formik.values.endDate}
                            onChange={(value) => {
                                formik.setFieldValue('endDate', value.format('MM/DD/YYYY'));
                            }}
                        />
                        {formik.errors.endDate && formik.touched.endDate ?
                            <small className='text-red-600'>{formik.errors.endDate}</small>
                            : null}

                    </div>
                </div>
                <div className="mb-10">
                    <label htmlFor="area" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Area</label>
                    <select
                        {...formik.getFieldProps('area')}
                        className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option defaultValue={null}>Choose an area</option>
                        <option value={EMPLOYEE_AREA.it}>IT</option>
                        <option value={EMPLOYEE_AREA.hhrr}>HHRR</option>
                        <option value={EMPLOYEE_AREA.accounting}>Accounting</option>
                        <option value={EMPLOYEE_AREA.customerCare}>Customer Care</option>
                    </select>
                    {formik.errors.area && formik.touched.area ?
                        <small className='text-red-600'>{formik.errors.area}</small>
                        : null}

                </div>
                <div className="flex justify-end my-4">
                    <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Confirm</button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;