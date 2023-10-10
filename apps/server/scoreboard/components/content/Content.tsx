"use client";

import { Login } from "../login/Login";
import { DbSelection } from "../db-selection/DbSelection";
import { Scoreboard } from "../scoreboard/Scoreboard";
import { Stage } from "../../types/types";
import { useContent } from "./useContent";
import { IconButton, Loader } from "shared/web/components";
import { BiArrowBack } from "react-icons/bi";
import { SessionProvider, signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { Session } from "next-auth";

type ContentProps = {
    session: Session;
};

export const Content = ({ session }: ContentProps) => {
    const { stage, update, goBack } = useContent();

    let component;
    switch (stage) {
        case Stage.Loading:
            component = <Loader className="w-8 h-8" />;
            break;
        case Stage.DbSelection:
            component = <DbSelection onSuccess={update} />;
            break;
        case Stage.Scoreboard:
            component = <Scoreboard />;
            break;
        default:
            component = <Login onSuccess={update} />;
            break;
    }

    const showBackButton = stage > Stage.Login;

    return (
        <SessionProvider
            session={session}
            basePath={`${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth`}>
            <header className="z-10 w-full p-3">
                <nav className="flex justify-between">
                    {showBackButton ? <IconButton onClick={goBack} Icon={BiArrowBack} /> : <span />}
                    <IconButton onClick={signOut} Icon={FiLogOut} />
                </nav>
            </header>
            <main className="absolute h-screen w-screen px-4 flex items-center justify-center">
                <div className="m-auto">{component}</div>
            </main>
        </SessionProvider>
    );
};
