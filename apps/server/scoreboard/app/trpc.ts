"use client";

import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "./api/trpc/[...trpc]/route";

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: `http://localhost:4200/api/trpc`,
        }),
    ],
});
