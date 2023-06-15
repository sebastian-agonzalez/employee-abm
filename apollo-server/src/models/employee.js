const casual = require("casual");

class Employee {
    constructor(employeeData) {
        let isPending = false;
        for (const key in employeeData) {
            console.log(key);
            if (!employeeData[key] && key !== 'endDate') {
                isPending = true;
                break;
            }
        }

        this.id = casual.uuid;
        this.name = employeeData.name;
        this.lastname = employeeData.lastname;
        this.beginDate = employeeData.beginDate;
        this.endDate = employeeData.endDate ?? null;
        this.registrationStatus = isPending ? "PENDING" : "COMPLETE"
        this.area = employeeData.area
    }
}

module.exports = Employee;