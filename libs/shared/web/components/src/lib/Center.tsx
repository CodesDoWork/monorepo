import { PropsWithChildren } from "react";

export const Center = ({ children }: PropsWithChildren) => {
    return (
        <div className={"flex h-screen"}>
            <div className={"m-auto"}>{children}</div>
        </div>
    );
};
