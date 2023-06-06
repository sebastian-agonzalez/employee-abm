'use client';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
export const ApolloService = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});

export const GET_EMPLOYEES = gql`
    query {
        employees {
            id
            name
            lastname
        }
    } `;