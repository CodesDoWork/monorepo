import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";

export const useLogoutButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const logout = useCallback(() => {
        setIsLoading(true);
        signOut().then(() => setIsLoading(false));
    }, [setIsLoading]);

    return { isLoading, logout };
};
