"use client";

import { IconType } from "react-icons";
import { Button, ButtonProps } from "../button/Button";
import { clsx } from "clsx";

type IconButtonProps = ButtonProps & {
    Icon: IconType;
};

export const IconButton = ({ Icon, ...buttonProps }: IconButtonProps) => {
    buttonProps.className = clsx(
        "group p-1 transition-opacity duration-100 opacity-80 hover:opacity-100",
        buttonProps.className,
    );

    return (
        <Button {...buttonProps} loaderClass="w-5 h-5">
            <Icon className="w-5 h-5 group-hover:drop-shadow group-hover:scale-110 transition duration-100" />
        </Button>
    );
};
