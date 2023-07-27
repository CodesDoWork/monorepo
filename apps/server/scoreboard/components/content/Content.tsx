"use client";

import { Login } from "../login/Login";
import { DbSelection } from "../db-selection/DbSelection";
import { Scoreboard } from "../scoreboard/Scoreboard";
import { Stage } from "../../types/types";
import { useContent } from "./useContent";
import { IconButton } from "shared/web/components";
import { BiArrowBack } from "react-icons/bi";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

export const Content = () => {
    const { stage, update, goBack } = useContent();

    let component;
    switch (stage) {
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

    return (
        <>
            <header className="z-10 w-full p-3">
                <nav className="flex justify-between">
                    {stage === Stage.Login ? (
                        <span />
                    ) : (
                        <IconButton onClick={goBack} Icon={BiArrowBack} />
                    )}
                    <IconButton onClick={signOut} Icon={FiLogOut} />
                </nav>
            </header>
            <main className="absolute h-screen w-screen px-4 flex items-center justify-center">
                <div className="m-auto">{component}</div>
            </main>
        </>
    );
};
