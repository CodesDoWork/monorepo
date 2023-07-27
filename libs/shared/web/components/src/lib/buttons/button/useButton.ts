import { useCallback, useState } from "react";

export type UseButtonProps = {
    onClick?: () => void | Promise<void>;
    disableLoading?: boolean;
};

export const useButton = ({ disableLoading, onClick: click }: UseButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = useCallback(async () => {
        if (!disableLoading) {
            setIsLoading(true);
        }

        click && (await click());
        setIsLoading(false);
    }, [disableLoading, click, setIsLoading]);

    return { isLoading, onClick };
};
