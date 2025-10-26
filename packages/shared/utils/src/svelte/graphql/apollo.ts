import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";

export function createApolloClient(uri: string, bearerToken: string): ApolloClient {
    return new ApolloClient({
        link: new HttpLink({ uri, headers: { Authorization: `Bearer ${bearerToken}` } }),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: "cache-and-network",
            },
        },
        cache: new InMemoryCache(),
        ssrMode: true,
    });
}
