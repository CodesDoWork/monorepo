import GhostContentAPI from "@tryghost/content-api";
import { env } from "../env";

export const ghostApi = new GhostContentAPI({
    url: "https://blog.justinkonratt.com",
    key: env.GHOST_API_KEY,
    version: "v5.0",
    makeRequest: ({ url, method, params, headers }) => {
        const urlWithParams = new URL(url);
        Object.entries(params || {}).forEach(([key, value]) =>
            urlWithParams.searchParams.append(key, value),
        );

        return fetch(urlWithParams, { method, headers })
            .then(res => res.json())
            .then(res => ({ data: res }));
    },
});
