"use client";

import { FiLogOut } from "react-icons/fi";
import { Loader } from "../Loader";
import { useLogoutButton } from "./useLogoutButton";

export const LogoutButton = () => {
    const { isLoading, logout } = useLogoutButton();

    return (
        <button
            className="group p-1 rounded-md transition-opacity duration-100 opacity-80 hover:opacity-100"
            type="button"
            onClick={logout}
            disabled={isLoading}>
            {isLoading ? (
                <Loader className="w-5 h-5" />
            ) : (
                <FiLogOut className="w-5 h-5 group-hover:drop-shadow group-hover:scale-110 transition duration-100" />
            )}
        </button>
    );
};
