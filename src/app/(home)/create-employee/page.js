'use client';

import { LoadingBackdrop, ConfirmDialog, EmployeeForm, CustomToast } from "@/components";
import { DIALOG_MODE } from "@/components/confirm-dialog/ConfirmDialog";
import { TOAST_MODE } from "@/components/custom-toast/CustomToast";
import { useCreateEmployee } from "@/services/apollo-service";
import EmployeeInput from "@/services/models/employee-input";
import useAppStore from "@/state/store";
import { ROUTES } from "@/variables/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateEmployeePage() {
    const router = useRouter();
    const [state, setState] = useState({
        formValues: {},
        resetForm: false,
        toastData: { show: false, message: null, mode: null },
        openConfirm: false,
        openLoadingBackdrop: false,
    });
    const resetStatsCount = useAppStore((state) => (state.resetStatsCount));
    const [postEmployee] = useCreateEmployee();

    const handleSubmit = (values) => {
        setState((prevState) => ({
            ...prevState,
            formValues: values,
            openConfirm: true,
        }));
    };

    const handleConfirmDialog = () => {
        setState((prevState) => ({
            ...prevState,
            openConfirm: false,
            openLoadingBackdrop: true,
        }));
        setTimeout(() => {
            const employeeInput = new EmployeeInput(state.formValues);
            postEmployee({
                variables: {
                    data: employeeInput,
                },
                onCompleted: (data) => {
                    setState((prevState) => ({
                        ...prevState,
                        openLoadingBackdrop: false,
                        toastData: {
                            show: true,
                            message: "Employee register created successfully",
                            mode: TOAST_MODE.success,
                        },
                        resetForm: true,
                    }));
                    resetStatsCount();
                    router.push(ROUTES.viewEmployee + data.createEmployee.id);
                },
                onError: (error) => {
                    setState((prevState) => ({
                        ...prevState,
                        openLoadingBackdrop: false,
                        toastData: {
                            show: true,
                            message: "Employee register could not be created",
                            mode: TOAST_MODE.error,
                        },
                    }));
                    console.error('Error creating user:', error);
                },
            });
        }, 3000);
    };

    const { openLoadingBackdrop, openConfirm, resetForm, toastData } = state;

    return (
        <>
            {
                openLoadingBackdrop && <LoadingBackdrop open={openLoadingBackdrop}></LoadingBackdrop>
            }
            {
                openConfirm && (
                    <ConfirmDialog
                        open={openConfirm}
                        setOpen={(value) => setState((prevState) => ({ ...prevState, openConfirm: value }))}
                        handleConfirm={handleConfirmDialog}
                        mode={DIALOG_MODE.create}
                    />
                )
            }
            {
                toastData.show && <CustomToast setToastData={(data) => setState((prevState) => ({ ...prevState, toastData: data }))} mode={toastData.mode} message={toastData.message}></CustomToast>
            }
            <div className="flex justify-center">
                <div className="w-full max-w-2xl">
                    <EmployeeForm resetForm={resetForm} handleSubmit={handleSubmit}></EmployeeForm>
                </div>
            </div>
        </>
    );
}