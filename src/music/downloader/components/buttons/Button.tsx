"use client";

import { clsx } from "clsx";
import { PropsWithChildren } from "react";
import { Loader } from "../Loader";
import { useButton, UseButtonProps } from "./useButton";

export type ButtonProps = PropsWithChildren<
    UseButtonProps & {
        className?: string;
        loaderClass?: string;
    }
>;

export const Button = ({ className, loaderClass, children, ...props }: ButtonProps) => {
    const { isLoading, onClick } = useButton(props);

    return (
        <button type="button" className={className} onClick={onClick} disabled={isLoading}>
            {isLoading ? <Loader className={clsx("mx-auto h-2/3", loaderClass)} /> : children}
        </button>
    );
};
