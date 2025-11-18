import { createApolloClient } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { env } from "../../env";

export const systemClient = createApolloClient(`${env.CMS_URL}/graphql/system`, env.CMS_TOKEN);
