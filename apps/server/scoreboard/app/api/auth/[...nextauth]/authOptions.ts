import { AuthOptions } from "next-auth";
import AuthentikProvider from "next-auth/providers/authentik";
import { env } from "../../../env";

export const authOptions: AuthOptions = {
    providers: [
        AuthentikProvider({
            clientId: env.AUTH_CLIENT_ID,
            clientSecret: env.AUTH_CLIENT_SECRET,
            issuer: env.AUTHENTIK_ISSUER,
        }),
    ],
};
