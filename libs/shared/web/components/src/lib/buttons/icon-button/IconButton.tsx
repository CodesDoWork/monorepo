"use client";

import { Loader } from "../../Loader";
import { useIconButton, UseIconButtonProps } from "./useIconButton";
import { IconType } from "react-icons";

type IconButtonProps = UseIconButtonProps & {
    Icon: IconType;
};

export const IconButton = ({ Icon, ...useIconButtonProps }: IconButtonProps) => {
    const { isLoading, onClick } = useIconButton(useIconButtonProps);

    return (
        <button
            className="group p-1 rounded-md transition-opacity duration-100 opacity-80 hover:opacity-100"
            type="button"
            onClick={onClick}
            disabled={isLoading}>
            {isLoading ? (
                <Loader className="w-5 h-5" />
            ) : (
                <Icon className="w-5 h-5 group-hover:drop-shadow group-hover:scale-110 transition duration-100" />
            )}
        </button>
    );
};
