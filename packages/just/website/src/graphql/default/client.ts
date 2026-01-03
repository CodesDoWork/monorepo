import {
    createApolloClient,
    getCacheAndNetworkOnServerFunction,
} from "@cdw/monorepo/shared-graphql";
import { env } from "../../env";

export const defaultClient = createApolloClient(`${env.CMS_URL}/graphql`, env.CMS_TOKEN);
export const queryDefault = getCacheAndNetworkOnServerFunction(defaultClient);
