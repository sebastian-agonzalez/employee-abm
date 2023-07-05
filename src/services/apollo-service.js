'use client';
import { ApolloClient, InMemoryCache, gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
export const ApolloService = new ApolloClient({
    uri: 'https://abm-server.onrender.com/',
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
export const useActiveWorkforce = (withLazy = false) => {
    console.log('entra usequery');
    return withLazy ? useLazyQuery(GET_ACTIVE_WORKFORCE) : useQuery(GET_ACTIVE_WORKFORCE);
}

//get total employees query
export const GET_CURRENT_WORKFORCE = gql`
    { 
        currentEmployeesCount {
            resultCount
        }
    }`;
//get total employees hook
export const useCurrentWorkforce = (withLazy = false) => {
    return withLazy ? useLazyQuery(GET_CURRENT_WORKFORCE) : useQuery(GET_CURRENT_WORKFORCE);
}
//get pending employees query
export const GET_PENDING_EMPLOYEES = gql`
    { 
        pendingEmployeesCount {
            resultCount
        }
    }`;

//get pending employees 
export const usePendingEmployees = (withLazy = false) => {
    return withLazy ? useLazyQuery(GET_PENDING_EMPLOYEES) : useQuery(GET_PENDING_EMPLOYEES);
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

/////////////////////
import axios from 'axios';

const GRAPHQL_ENDPOINT = 'https://abm-server.onrender.com/';

export const fetchGraphQLData = async (query) => {
    try {
        const response = await axios.post(GRAPHQL_ENDPOINT, {
            query: query,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching GraphQL data:', error);
        throw error;
    }
};

export const fetchEmployeeData = async () => {
    try {
        return fetchGraphQLData(`
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
        }`);
    } catch (error) {
        return error;
    }
};

export const fetchActiveEmployeesCount = async () => {
    try {
        return fetchGraphQLData(`
        { 
            activeEmployeesCount {
                resultCount
            }
        }`);
    } catch (error) {
        return error;
    }
}
export const fetchCurrentEmployeesCount = async () => {
    try {
        return fetchGraphQLData(`
        { 
            currentEmployeesCount {
                resultCount
            }
        }`);
    } catch (error) {
        return error;
    }
}
export const fetchPendingEmployeesCount = async () => {
    try {
        return fetchGraphQLData(`
        { 
            pendingEmployeesCount {
                resultCount
            }
        }`);
    } catch (error) {
        return error;
    }
}
