'use client';
import { ApolloClient, InMemoryCache, gql, useLazyQuery, useQuery } from '@apollo/client';
export const ApolloService = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});

export const GET_EMPLOYEES = gql`
    {
        getEmployeesData {
            info {
                resultCount
                }
            data {
                employees {
                id
                    name
                    lastname
                    }
            }
        }
    } `;

//employees query hook
export const useEmployees = (withLazy) => {
    return withLazy ? useLazyQuery(GET_EMPLOYEES) : useQuery(GET_EMPLOYEES);
}

export const GET_EMPLOYEE = gql`
    query GetEmployee($id: ID!) {
        getEmployeeData(id: $id) {
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
    }
`;

//employee hook
export const useEmployee = (id) => {
    return useQuery(GET_EMPLOYEE, {
        variables: {
            id,
        }
    });
}