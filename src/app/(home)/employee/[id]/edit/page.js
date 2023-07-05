'use client'

import { LoadingBackdrop, CardLoadingSpinner, ConfirmDialog, EmployeeForm, CustomToast } from "@/components";
import { DIALOG_MODE } from "@/components/confirm-dialog/ConfirmDialog";
import { TOAST_MODE } from "@/components/custom-toast/CustomToast";
import { EmployeeDataContext } from "@/context/employeesDataContext";
import { ToastNotificationContext } from "@/context/ToastNotificationContext";
import useEmployeeData from "@/custom-hooks/useEmployeeData";
import { useEditEmployee } from "@/services/apollo-service";
import EmployeeInput from "@/services/models/employee-input";
import useAppStore from "@/state/store";
import { ROUTES } from "@/variables/routes";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const EmployeeEditPage = () => {
    const setEmployeesData = useAppStore((state) => (state.setEmployeesData));
    const setCurrentCount = useAppStore((state) => (state.setCurrentCount));
    const setActiveCount = useAppStore((state) => (state.setActiveCount));
    const setPendingCount = useAppStore((state) => (state.setPendingCount));

    const router = useRouter();
    const params = useParams();
    const { contextState } = useContext(EmployeeDataContext);
    const { updateContext: setToastData } = useContext(ToastNotificationContext);
    const [fetchEmployee, { loading, error, data }] = useEmployeeData(params.id);
    const [state, setState] = useState({
        employee: undefined,
        formValues: {},
        resetForm: false,
        openConfirm: false,
        openLoadingBackdrop: false,
    });
    const [editEmployee] = useEditEmployee();

    useEffect(() => {
        if (!contextState.employeeData) {
            fetchEmployee();
        } else {
            setState((prevState) => ({
                ...prevState,
                employee: contextState.employeeData,
            }));
        }
    }, []);

    useEffect(() => {
        if (data) {
            setState((prevState) => ({
                ...prevState,
                employee: data.employeeData.employee,
            }));
        }
    }, [data]);

    const refetchData = () => {
        setEmployeesData(null);
        setCurrentCount(null);
        setActiveCount(null);
        setPendingCount(null);
    }

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
            editEmployee({
                variables: {
                    data: employeeInput,
                },
                onCompleted: (data) => {
                    setState((prevState) => ({
                        ...prevState,
                        openLoadingBackdrop: false,
                    }));
                    setToastData({
                        show: true,
                        message: "Employee register modified successfully",
                        mode: TOAST_MODE.success,
                    });
                    setState((prevState) => ({
                        ...prevState,
                        resetForm: true,
                    }));
                    refetchData();
                    //console.log(data);
                    router.push(ROUTES.viewEmployee + state.employee.id);
                },
                onError: (error) => {
                    setState((prevState) => ({
                        ...prevState,
                        openLoadingBackdrop: false,
                    }));
                    setToastData({
                        show: true,
                        message: "Employee register could not be modified",
                        mode: TOAST_MODE.error,
                    });
                    console.error("Error creating user:", error);
                },
            });
        }, 3000);
    };

    const { employee, resetForm, openConfirm, openLoadingBackdrop } = state;

    //console.log(employee);
    //console.log(contextState.employeeData);

    return (
        <>
            {openLoadingBackdrop && <LoadingBackdrop open={openLoadingBackdrop} />}
            {openConfirm && (
                <ConfirmDialog
                    open={openConfirm}
                    setOpen={(value) =>
                        setState((prevState) => ({
                            ...prevState,
                            openConfirm: value,
                        }))
                    }
                    handleConfirm={handleConfirmDialog}
                    mode={DIALOG_MODE.edit}
                />
            )}
            {(loading || employee === undefined) && (
                <div className="flex h-full items-start justify-center w-full">
                    <CardLoadingSpinner />
                </div>
            )}
            {employee === null || error &&
                <div className="flex justify-center">
                    <div className="w-full max-w-2xl">
                        <div className="my-3 p-8 card-shadow bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-center items-center">
                                {error && <h2>There's been a problem loading the data.</h2>}
                                {employee === null &&
                                    <h2>An employee with such ID does not exist.</h2>}
                            </div>
                        </div>
                    </div>
                </div>
            }
            {employee && employee !== null && (
                <div className="flex justify-center">
                    <div className="w-full max-w-2xl">
                        <EmployeeForm
                            employeeData={employee}
                            resetForm={resetForm}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default EmployeeEditPage;
