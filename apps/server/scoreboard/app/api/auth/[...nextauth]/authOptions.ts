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
    callbacks: {
        async redirect({ url }) {
            const origin = new URL(url).origin;
            const baseUrl = `${origin}${env.BASE_PATH}`;
            if (url.startsWith(baseUrl)) {
                return url;
            }

            const rest = url.substring(origin.length);
            return `${baseUrl}${rest}`;
        },
    },
};
