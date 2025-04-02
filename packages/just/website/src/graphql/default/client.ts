import { env } from "../../env";
import { createApolloClient } from "../client";

export const client = createApolloClient(`${env.CMS_URL}/graphql`, env.CMS_TOKEN);
export default client;
