import type { ApolloQueryResult, NormalizedCacheObject } from "@apollo/client/core";
import type { Readable, Unsubscriber } from "svelte/store";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";

type DataOf<T extends Readable<ApolloQueryResult<unknown>>> = Parameters<
    Parameters<T["subscribe"]>[0]
>[0]["data"];

export function toPromise<Q extends ApolloQueryResult<unknown>, T extends Readable<Q>>(
    result: T,
): Promise<DataOf<T>> {
    return new Promise((resolve, reject) => {
        let unsubscriber: Unsubscriber | undefined;
        const handleData = (query: Q) => {
            if (!query.loading) {
                unsubscriber?.();
                if (query.error || query.errors) {
                    reject(query.error || query.errors);
                } else {
                    resolve(query.data);
                }
            }
        };

        unsubscriber = result.subscribe(handleData);
    });
}

export function createApolloClient(
    uri: string,
    bearerToken: string,
): ApolloClient<NormalizedCacheObject> {
    return new ApolloClient({
        uri,
        defaultOptions: {
            watchQuery: {
                fetchPolicy: "cache-and-network",
            },
        },
        headers: { Authorization: `Bearer ${bearerToken}` },
        cache: new InMemoryCache(),
        ssrMode: true,
    });
}
