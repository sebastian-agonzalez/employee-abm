'use client'
import { LoadingBackdrop, CardLoadingSpinner, ConfirmDialog, EmployeeForm, CustomToast } from "@/components";
import { DIALOG_MODE } from "@/components/confirm-dialog/ConfirmDialog";
import { TOAST_MODE } from "@/components/custom-toast/CustomToast";
import { EmployeeDataContext } from "@/context/employeesDataContext";
import useEmployeeData from "@/custom-hooks/useEmployeeData";
import { useEditEmployee } from "@/services/apollo-service";
import EmployeeInput from "@/services/models/employee-input";
import { ROUTES } from "@/variables/routes";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const EmployeeEditPage = () => {
    let employee;
    const router = useRouter();
    const { contextState } = useContext(EmployeeDataContext);
    const params = useParams();
    const [fetchEmployee, { loading, error, data }] = useEmployeeData(params.id);
    const [formValues, setFormValues] = useState({})
    const [editEmployee] = useEditEmployee();
    const [resetForm, setResetForm] = useState(false);
    const [toastData, setToastData] = useState({ show: false, message: null, mode: null });
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openLoadingBackdrop, setOpenLoadingBackdrop] = useState(false);

    if (contextState.employeeData) employee = contextState.employeeData;
    if (data) employee = data.employeeData.employee;

    useEffect(() => {
        if (!contextState.employeeData) {
            //console.log('entra fetch');
            fetchEmployee();
        }
    }, []);

    const handleSubmit = (values) => {
        //console.log('handle submit', values);
        setFormValues(values);
        setOpenConfirm(true);
    }

    const handleConfirmDialog = () => {
        setTimeout(() => {
            const employeeInput = new EmployeeInput(formValues);
            editEmployee({
                variables: {
                    data: employeeInput
                },
                onCompleted: (data) => {
                    setOpenLoadingBackdrop(false);
                    setToastData({
                        show: true,
                        message: "Employee register modified successfully",
                        mode: TOAST_MODE.success
                    });
                    setResetForm(true);
                    router.push(ROUTES.viewEmployee + employee.id);
                    //console.log(data);
                },
                onError: (error) => {
                    setOpenLoadingBackdrop(false);
                    setToastData({
                        show: true,
                        message: "Employee register could not be modified",
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
                    mode={DIALOG_MODE.edit}
                >
                </ConfirmDialog >
            }
            {
                toastData.show && <CustomToast setToastData={setToastData} mode={toastData.mode} message={toastData.message}></CustomToast>
            }
            {(loading || employee === undefined) && <div className="flex h-full items-start justify-center w-full">
                <CardLoadingSpinner />
            </div>}
            {error &&
                <div className="flex justify-center items-center">
                    <h2>There's been a problem loading the data.</h2>
                </div>
            }
            {employee && employee != null && <div className="flex justify-center">
                <div className="w-full max-w-2xl">
                    <EmployeeForm employeeData={employee} resetForm={resetForm} handleSubmit={handleSubmit}></EmployeeForm>
                </div>
            </div>}
        </>

    );
}

export default EmployeeEditPage;