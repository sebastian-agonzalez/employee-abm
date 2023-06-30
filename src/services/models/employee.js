class Employee {
    constructor(employeeData) {
        this.id = employeeData.id
        this.name = employeeData.name
        this.lastname = employeeData.lastname
        this.beginDate = employeeData.beginDate
        this.endDate = employeeData.endDate
        this.registrationStatus = employeeData.registrationStatus
        this.area = employeeData.area,
        this.profilePic = employeeData.profilePic
    }
}

export default Employee;