
const { ApolloServer, gql } = require('apollo-server');
const casual = require("casual");
const Employee = require('./models/employee');

const EMPLOYEE_DATA_MOCK =
    [
        {
            id: casual.uuid, name: casual.first_name, lastname: null, beginDate: casual.date('YYYY-MM-DD'), endDate: null, registrationStatus: "PENDING", area: "IT", profilePic: "https://members-api.parliament.uk/api/Members/4743/Portrait?cropType=OneOne&webVersion=false"
        },
        {
            id: casual.uuid, name: casual.first_name, lastname: casual.last_name, beginDate: casual.date('YYYY-MM-DD'), endDate: casual.date('YYYY-MM-DD'), registrationStatus: "COMPLETE", area: "IT", profilePic: "https://awnnetwork.org/wp-content/uploads/2022/09/Angelica-Vega-square.webp"
        },
        {
            id: casual.uuid, name: casual.first_name, lastname: casual.last_name, beginDate: casual.date('YYYY-MM-DD'), endDate: null, registrationStatus: "COMPLETE", area: "HHRR", profilePic: "https://members-api.parliament.uk/api/Members/4530/Portrait?cropType=OneOne&webVersion=false"
        },
        {
            id: casual.uuid, name: null, lastname: casual.last_name, beginDate: casual.date('YYYY-MM-DD'), endDate: null, registrationStatus: "COMPLETE", area: "IT", profilePic: "https://fredsphoto.com/Kai2.jpg"
        },
        {
            id: casual.uuid, name: casual.first_name, lastname: casual.last_name, beginDate: casual.date('YYYY-MM-DD'), endDate: null, registrationStatus: "COMPLETE", area: "Accounting", profilePic: "https://members-api.parliament.uk/api/Members/4070/Portrait?cropType=OneOne&webVersion=false"
        },
        {
            id: casual.uuid, name: casual.first_name, lastname: null, beginDate: casual.date('YYYY-MM-DD'), endDate: casual.date('YYYY-MM-DD'), registrationStatus: "PENDING", area: null, profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLe0Mmf01BQ1Pu9O7kfn-djqmy_mGEWjCR9LXLRsRzAr8cZAqX2u20TUm2zxQOKHTpCow&usqp=CAU"
        },
    ]
    ;

const typeDefs = gql`
directive @oneOf(values: [String!]!) on FIELD_DEFINITION

enum RegStatus {
    COMPLETE
    PENDING
} 

type Employee {
    id: ID!
    name: String
    lastname: String
    beginDate: String
    endDate: String 
    registrationStatus: RegStatus! 
    area: String
        @oneOf(values: ["IT", "HHRR", "Accounting", "Customer Care"]),
    profilePic: String!
}

type Query {
    employeesData: GetEmployeesData!
    employeeData(id: ID!): GetEmployeeData!
    getEmployee(regStatus: RegStatus!): GetEmployeeData
    activeEmployeesCount: ResponseInfo!
    currentEmployeesCount: ResponseInfo!
    pendingEmployeesCount: ResponseInfo!
}

type Mutation {
  createEmployee(data: EmployeeInput!): Employee!
  editEmployee(data: EmployeeInput!): Employee!
  # Additional mutations...
}

type GetEmployeesData {
    info: ResponseInfo!
    data: EmployeesData!
}
type EmployeesData {
    employees: [Employee!]
}

type GetEmployeeData {
    employee: Employee
}

input EmployeeInput {
    id: String
    name: String!
    lastname: String!
    beginDate: String
    endDate: String
    area: String
}

type ResponseInfo {
    resultCount: Int!
}
`;

// mutation UpdateEmployee($input: UpdateEmployeeInput!) {
//     updateEmployee(input: $input) {
//       id
//       name
//       position
//       department
//       salary
//     }

//resolvers mock
const resolvers = {
    Query: {
        employeesData: () => {
            console.log('entra');
            const data =
            {
                employees: EMPLOYEE_DATA_MOCK,
            }
            const info = { resultCount: data.employees.length };
            return {
                info,
                data,
            }
        },
        activeEmployeesCount: () => {
            return {
                resultCount: EMPLOYEE_DATA_MOCK.filter(e => !e.endDate).length
            }
        },
        currentEmployeesCount: () => {
            return {
                resultCount: EMPLOYEE_DATA_MOCK.length
            }
        },
        pendingEmployeesCount: () => {
            return {
                resultCount: EMPLOYEE_DATA_MOCK.filter(e => e.registrationStatus != "COMPLETE").length
            }
        },
        employeeData: (parent, args) => {
            const employee = EMPLOYEE_DATA_MOCK.find(e => e.id === args.id);
            return {
                employee: employee ? employee : null
            }
        }
    },
    Mutation: {
        createEmployee: (_, args) => {
            //console.log(args);
            const employee = new Employee(args.data);
            EMPLOYEE_DATA_MOCK.unshift(employee);
            return employee
        },
        editEmployee: (_, args) => {
            console.log('arg data', args.data);
            const employee = new Employee(args.data);
            console.log('new employee', employee);
            console.log('index', EMPLOYEE_DATA_MOCK.findIndex((e) => e.id === employee.id));
            EMPLOYEE_DATA_MOCK[EMPLOYEE_DATA_MOCK.findIndex((e) => e.id === employee.id)] = employee;
            console.log(EMPLOYEE_DATA_MOCK[EMPLOYEE_DATA_MOCK.indexOf(employee)])
            return employee
        },
    }
};

function oneOfDirective(values) {
    return async (next, source, args, context, info) => {
        const value = await next();

        if (!values.includes(value)) {
            throw new Error(`Invalid value for field '${info.fieldName}'.`);
        }

        return value;
    };
}

const server = new ApolloServer({
    //mocks: true,
    typeDefs,
    resolvers,
    plugins: [
        {
            requestDidStart() {
                return {
                    fieldDidResolve(source, args, context, info) {
                        const directive = info.directives.find((directive) => directive.name.value === 'oneOf');

                        if (directive) {
                            const values = directive.arguments.find((arg) => arg.name.value === 'values').value.values.map(
                                (value) => value.value
                            );

                            return oneOfDirective(values);
                        }
                    },
                };
            },
        },
    ],
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url} `);
});
