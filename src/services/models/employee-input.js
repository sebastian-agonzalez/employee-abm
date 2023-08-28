class EmployeeInput {
    constructor(employeeData) {
        this.id  = employeeData.id || null;
        this.name = employeeData.firstName.trim()
        this.lastname = employeeData.lastName.trim()
        this.beginDate = employeeData.beginDate || null
        this.endDate = employeeData.endDate || null
        this.area = employeeData.area || null
    }
}

export default EmployeeInput;