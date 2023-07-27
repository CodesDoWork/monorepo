import { useCallback, useState } from "react";

export type UseIconButtonProps = {
    onClick: () => Promise<void>;
};

export const useIconButton = ({ onClick }: UseIconButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onClickCallback = useCallback(() => {
        setIsLoading(true);
        onClick().then(() => setIsLoading(false));
    }, [setIsLoading, onClick]);

    return { isLoading, onClick: onClickCallback };
};
