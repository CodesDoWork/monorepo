"use client";

import type { PropsWithChildren } from "react";
import type { UseButtonProps } from "./useButton";
import { clsx } from "clsx";
import { Loader } from "../Loader";
import { useButton } from "./useButton";

export type ButtonProps = PropsWithChildren<
    UseButtonProps & {
        className?: string;
        loaderClass?: string;
    }
>;

export function Button({ className, loaderClass, children, ...props }: ButtonProps) {
    const { isLoading, onClick } = useButton(props);

    return (
        <button type="button" className={className} onClick={onClick} disabled={isLoading}>
            {isLoading ? <Loader className={clsx("mx-auto h-2/3", loaderClass)} /> : children}
        </button>
    );
}
