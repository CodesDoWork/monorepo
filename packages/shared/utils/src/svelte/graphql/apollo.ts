import type { WatchQueryFetchPolicy } from "@apollo/client/core";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";

interface ApolloOptions {
    fetchPolicy?: WatchQueryFetchPolicy;
}

export function createApolloClient(
    uri: string,
    bearerToken: string,
    options: ApolloOptions = {},
): ApolloClient {
    return new ApolloClient({
        link: new HttpLink({ uri, headers: { Authorization: `Bearer ${bearerToken}` } }),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: options.fetchPolicy || "cache-and-network",
            },
        },
        cache: new InMemoryCache(),
        ssrMode: true,
    });
}
