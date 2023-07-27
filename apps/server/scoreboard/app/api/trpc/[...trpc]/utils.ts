import { getServerSession, Session } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { TRPCError } from "@trpc/server";

export const getSession = async (): Promise<Session> => {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new TRPCError({ message: "Unauthorized", code: "UNAUTHORIZED" });
    }

    return session;
};
