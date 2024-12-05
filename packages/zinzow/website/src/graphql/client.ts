import { ApolloClient, InMemoryCache, type NormalizedCacheObject } from "@apollo/client/core";

export function createApolloClient(
    uri: string,
    bearerToken: string,
): ApolloClient<NormalizedCacheObject> {
    return new ApolloClient({
        uri,
        defaultOptions: {
            query: {
                fetchPolicy: "no-cache",
            },
            watchQuery: {
                fetchPolicy: "no-cache",
            },
        },
        headers: { Authorization: `Bearer ${bearerToken}` },
        cache: new InMemoryCache(),
        ssrMode: true,
    });
}
