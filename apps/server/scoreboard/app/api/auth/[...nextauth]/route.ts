import NextAuth from "next-auth";
import AuthentikProvider from "next-auth/providers/authentik";
import { env } from "../../../env";

export const authOptions = {
    providers: [
        AuthentikProvider({
            clientId: env.AUTH_CLIENT_ID,
            clientSecret: env.AUTH_CLIENT_SECRET,
            issuer: env.AUTHENTIK_ISSUER,
        }),
    ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
