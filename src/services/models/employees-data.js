import Employee from "./employee";

class EmployeesData {
    constructor(employeeArray) {
        this.employees = employeeArray.map(e => new Employee(e));
    }

    getData() {
        return this.employees;
    }
}

export default EmployeesData;