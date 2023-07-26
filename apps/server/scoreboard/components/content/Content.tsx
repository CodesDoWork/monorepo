"use client";

import { Login } from "../login/Login";
import { HTMLProps } from "react";
import { DbSelection } from "../db-selection/DbSelection";
import { Scoreboard } from "../scoreboard/Scoreboard";
import { Stage } from "../../types/types";
import { useContent } from "./useContent";

type ContentProps = HTMLProps<HTMLDivElement>;

export const Content = (props: ContentProps) => {
    const { stage, update } = useContent();

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

    return <div {...props}>{component}</div>;
};
