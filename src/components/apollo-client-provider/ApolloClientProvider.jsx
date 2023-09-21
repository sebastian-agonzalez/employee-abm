"use client";
import { ApolloService } from "@/services/apollo-service";
import { ApolloProvider } from "@apollo/client";

const ApolloClientProvider = ({ children }) => {
  return <ApolloProvider client={ApolloService}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
