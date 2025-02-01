import { ApolloQueryResult } from "@apollo/client/core";
import { Readable, Unsubscriber } from "svelte/store";

type DataOf<T extends Readable<ApolloQueryResult<unknown>>> = Parameters<
    Parameters<T["subscribe"]>[0]
>[0]["data"];

export function toPromise<Q extends ApolloQueryResult<unknown>, T extends Readable<Q>>(
    result: T,
): Promise<DataOf<T>> {
    return new Promise((resolve, reject) => {
        let unsubscriber: Unsubscriber | undefined = undefined;
        const handleData = (query: Q) => {
            if (query.error || query.errors) {
                unsubscriber?.();
                reject(query.error || query.errors);
            } else if (query.data && Object.keys(query.data).length) {
                unsubscriber?.();
                resolve(query.data);
            }
        };

        unsubscriber = result.subscribe(handleData);
    });
}
