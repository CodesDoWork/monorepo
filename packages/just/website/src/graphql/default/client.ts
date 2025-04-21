import { createApolloClient } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { env } from "../../env";

export const client = createApolloClient(`${env.CMS_URL}/graphql`, env.CMS_TOKEN);
export default client;
