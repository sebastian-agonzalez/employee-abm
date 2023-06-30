'use client';

import { LoadingBackdrop, ConfirmDialog, EmployeeForm, CustomToast } from "@/components";
import { DIALOG_MODE } from "@/components/confirm-dialog/ConfirmDialog";
import { TOAST_MODE } from "@/components/custom-toast/CustomToast";
import { useCreateEmployee } from "@/services/apollo-service";
import EmployeeInput from "@/services/models/employee-input";
import { useState } from "react";

export default function CreateEmployeePage() {
    const [postEmployee] = useCreateEmployee();
    const [formValues, setFormValues] = useState({})
    const [resetForm, setResetForm] = useState(false);
    const [toastData, setToastData] = useState({ show: false, message: null, mode: null });
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openLoadingBackdrop, setOpenLoadingBackdrop] = useState(false);

    const handleSubmit = (values) => {
        setFormValues(values);
        setOpenConfirm(true);
    }

    const handleConfirmDialog = () => {
        setOpenConfirm(false);
        setOpenLoadingBackdrop(true);
        setTimeout(() => {
            const employeeInput = new EmployeeInput(formValues);
            postEmployee({
                variables: {
                    data: employeeInput
                },
                onCompleted: (data) => {
                    setOpenLoadingBackdrop(false);
                    setToastData({
                        show: true,
                        message: "Employee register created successfully",
                        mode: TOAST_MODE.success
                    });
                    setResetForm(true);
                    //console.log(data);
                },
                onError: (error) => {
                    setOpenLoadingBackdrop(false);
                    setToastData({
                        show: true,
                        message: "Employee register could not be created",
                        mode: TOAST_MODE.error
                    });
                    console.error('Error creating user:', error);
                },
            });
        }, 3000);
    }

    return (
        <>
            {
                openLoadingBackdrop
                && <LoadingBackdrop open={openLoadingBackdrop}></LoadingBackdrop>
            }
            {
                openConfirm &&
                <ConfirmDialog
                    open={openConfirm}
                    setOpen={setOpenConfirm}
                    handleConfirm={handleConfirmDialog}
                    mode={DIALOG_MODE.create}
                >
                </ConfirmDialog >
            }
            {
                toastData.show && <CustomToast setToastData={setToastData} mode={toastData.mode} message={toastData.message}></CustomToast>
            }
            <div className="flex justify-center">
                <div className="w-full max-w-2xl">
                    {/* <h1 className="flex justify-start text-3xl font-bold text-primary mb-4">New Employee</h1> */}
                    <EmployeeForm resetForm={resetForm} handleSubmit={handleSubmit}></EmployeeForm>
                </div>
            </div>
        </>

    )
}