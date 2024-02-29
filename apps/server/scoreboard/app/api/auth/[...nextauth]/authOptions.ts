import { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { env } from "../../../env";

export const authOptions: AuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: env.AUTH_CLIENT_ID,
            clientSecret: env.AUTH_CLIENT_SECRET,
            issuer: env.AUTH_ISSUER,
        }),
    ],
};
