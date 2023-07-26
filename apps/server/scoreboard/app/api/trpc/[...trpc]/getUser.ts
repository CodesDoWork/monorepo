import { getSession } from "./utils";
import { TRPCError } from "@trpc/server";
import { User, UserModel } from "../../../../db/user";

type SessionUser = {
    email: string;
    username: string;
};

export const getUser = async (): Promise<UserModel> => {
    const { email } = await getSessionUser();
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new TRPCError({ message: "user not found", code: "NOT_FOUND" });
    }

    return user;
};

export const getSessionUser = async (): Promise<SessionUser> => {
    const session = await getSession();
    if (!session.user) {
        throw new TRPCError({ message: "no user found", code: "BAD_REQUEST" });
    }

    const { email, name } = session.user;
    if (!email || !name) {
        throw new TRPCError({ message: "user info not found", code: "BAD_REQUEST" });
    }

    return { email, username: name };
};
