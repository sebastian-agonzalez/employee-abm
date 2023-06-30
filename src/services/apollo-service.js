'use client';
import { ApolloClient, InMemoryCache, gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
export const ApolloService = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});

export const GET_EMPLOYEES = gql`
    {
        employeesData {
            info {
                resultCount
                }
            data {
                employees {
                    id
                    name
                    lastname
                    lastname
                    beginDate
                    endDate
                    registrationStatus
                    area
                    }
            }
        }
    }`;

//employees query hook
export const useEmployees = (withLazy) => {
    return withLazy ? useLazyQuery(GET_EMPLOYEES) : useQuery(GET_EMPLOYEES);
}

//employee query
export const GET_EMPLOYEE = gql`
    query GetEmployee($id: ID!) {
        employeeData(id: $id) {
            employee {
                id
                name
                lastname
                beginDate
                endDate
                registrationStatus
                area
                profilePic
            }
        }
    }`;

//employee hook
export const useEmployee = (id, withLazy = false) => {
    return withLazy ? useLazyQuery(GET_EMPLOYEE, {
        variables: {
            id,
        }
    }) : useQuery(GET_EMPLOYEE, {
        variables: {
            id,
        }
    });


}

//get empleyees without endDate query
export const GET_ACTIVE_WORKFORCE = gql`
    { 
        activeEmployeesCount {
            resultCount
        }
    }`;

//get empleyees without endDate hook
export const useActiveWorkforce = () => {
    return useQuery(GET_ACTIVE_WORKFORCE);
}

//get total employees query
export const GET_CURRENT_WORKFORCE = gql`
    { 
        currentEmployeesCount {
            resultCount
        }
    }`;
//get total employees hook
export const useCurrentWorkforce = () => {
    return useQuery(GET_CURRENT_WORKFORCE);
}
//get pending employees query
export const GET_PENDING_EMPLOYEES = gql`
    { 
        pendingEmployeesCount {
            resultCount
        }
    }`;

//get pending employees 
export const usePendingEmployees = () => {
    return useQuery(GET_PENDING_EMPLOYEES);
}

//new employee mutation
export const POST_EMPLOYEE = gql`
     mutation createEmployee($data: EmployeeInput!) {
        createEmployee(data: $data) {
                id
                name
                lastname
                beginDate
                endDate
                registrationStatus
                area
            }
        }`;

export const PUT_EMPLOYEE = gql`
     mutation editEmployee($data: EmployeeInput!) {
        editEmployee(data: $data) {
                id
                name
                lastname
                beginDate
                endDate
                registrationStatus
                area
            }
        }`;

export const useCreateEmployee = () => {
    return useMutation(POST_EMPLOYEE);
}

export const useEditEmployee = () => {
    return useMutation(PUT_EMPLOYEE);
}

