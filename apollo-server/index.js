
const { ApolloServer, gql } = require('apollo-server');
const casual = require("casual");

const EMPLOYEE_DATA_MOCK = Object.freeze(
    [
        {
            id: casual.uuid, name: casual.first_name, lastname: null, beginDate: casual.date('YYYY-MM-DD'), endDate: null, registrationStatus: "PENDING", area: "IT"
        },
        {
            id: casual.uuid, name: casual.first_name, lastname: casual.last_name, beginDate: casual.date('YYYY-MM-DD'), endDate: casual.date('YYYY-MM-DD'), registrationStatus: "COMPLETE", area: "IT"
        },
        {
            id: casual.uuid, name: casual.first_name, lastname: casual.last_name, beginDate: casual.date('YYYY-MM-DD'), endDate: null, registrationStatus: "COMPLETE", area: "HHRR"
        },
        {
            id: casual.uuid, name: null, lastname: casual.last_name, beginDate: casual.date('YYYY-MM-DD'), endDate: null, registrationStatus: "COMPLETE", area: "IT"
        },
        {
            id: casual.uuid, name: casual.name, lastname: casual.last_name, beginDate: casual.date('YYYY-MM-DD'), endDate: null, registrationStatus: "COMPLETE", area: "Accounting"
        },
        {
            id: casual.uuid, name: casual.name, lastname: null, beginDate: casual.date('YYYY-MM-DD'), endDate: casual.date('YYYY-MM-DD'), registrationStatus: "PENDING", area: null
        },
    ]
);

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
        @oneOf(values: ["IT", "HHRR", "Accounting", "Customer Care"])
}

type Query {
    getEmployeesData: GetEmployeesData!
    getEmployeeData(id: ID!): GetEmployeeData!
    getEmployee(regStatus: RegStatus!): GetEmployeeData
    getActiveEmployeesCount: ResponseInfo!
    getCurrentEmployeesCount: ResponseInfo!
    getPendingEmployeesCount: ResponseInfo!
}

type GetEmployeesData {
    info: ResponseInfo!
    data: EmployeesData!
}
type EmployeesData {
    employees: [Employee!]
}

type GetEmployeeData {
    employee: Employee!
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
const resolvers = {
    Query: {
        getEmployeesData: () => {
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
        getActiveEmployeesCount: () => {
            return {
                resultCount: EMPLOYEE_DATA_MOCK.filter(e => !e.endDate).length
            }
        },
        getCurrentEmployeesCount: () => {
            return {
                resultCount: EMPLOYEE_DATA_MOCK.length
            }
        },
        getPendingEmployeesCount: () => {
            return {
                resultCount: EMPLOYEE_DATA_MOCK.filter(e => e.registrationStatus != "COMPLETE").length
            }
        },
        getEmployeeData: (parent, args) => {
            //console.log(args.id);
            // console.log(EMPLOYEE_DATA_MOCK)
            const employee = EMPLOYEE_DATA_MOCK.find(e => e.id === args.id);
            //console.log(employee);
            return {
                employee: employee
            }
        }
    },
    // Mutation: {

    // }
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
