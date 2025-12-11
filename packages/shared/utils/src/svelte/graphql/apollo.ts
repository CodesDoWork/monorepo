import type { OperationVariables } from "@apollo/client/core";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";

export function createApolloClient(uri: string, bearerToken: string): ApolloClient {
    return new ApolloClient({
        link: new HttpLink({ uri, headers: { Authorization: `Bearer ${bearerToken}` } }),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: "cache-and-network",
            },
        },
        cache: new InMemoryCache({}),
        ssrMode: false,
    });
}

export function getCacheAndNetworkOnServerFunction(client: ApolloClient) {
    return async function <
        TData = unknown,
        TVariables extends OperationVariables = OperationVariables,
    >(options: ApolloClient.QueryOptions<TData, TVariables>): Promise<TData> {
        let cached: TData | null = null;
        try {
            cached = client.readQuery(options) ?? null;
        } catch {
            cached = null;
        }

        const networkRequest = client.query({ ...options, fetchPolicy: "network-only" });
        if (cached) {
            return cached;
        }

        const networkResult = await networkRequest;
        const networkData = networkResult.data;
        if (networkData) {
            return networkData;
        }

        throw networkResult.error;
    };
}
