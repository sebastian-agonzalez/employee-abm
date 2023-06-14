'use client';
import { ApolloClient, InMemoryCache, gql, useLazyQuery, useQuery } from '@apollo/client';
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
            }
        }
    }`;

//employee hook
export const useEmployee = (id) => {
    return useQuery(GET_EMPLOYEE, {
        variables: {
            id,
        }
    });
}

export const GET_ACTIVE_WORKFORCE = gql`
    { 
        activeEmployeesCount {
            resultCount
        }
    }`;

//get empleyees without endDate
export const useActiveWorkforce = () => {
    return useQuery(GET_ACTIVE_WORKFORCE);
}

export const GET_CURRENT_WORKFORCE = gql`
    { 
        currentEmployeesCount {
            resultCount
        }
    }`;
//get total employees 
export const useCurrentWorkforce = () => {
    return useQuery(GET_CURRENT_WORKFORCE);
}

export const GET_PENDING_EMPLOYEES = gql`
    { 
        pendingEmployeesCount {
            resultCount
        }
    }`;
//get total employees 
export const usePendingEmployees = () => {
    return useQuery(GET_PENDING_EMPLOYEES);
}