import { ChangeEvent, useCallback, useState } from "react";

type UseInlineActionInputProps = {
    onChange?: (value: string) => void;
    onClick?: () => Promise<void>;
};

export const useInlineActionInput = ({ onChange, onClick }: UseInlineActionInputProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onChangeCallback = useCallback(
        (e: ChangeEvent) => {
            onChange && onChange((e.target as HTMLInputElement).value);
        },
        [onChange],
    );

    const onSubmit = useCallback(() => {
        if (onClick) {
            setIsLoading(true);
            onClick().then(() => setIsLoading(false));
        }
    }, [onClick, setIsLoading]);

    return { onChange: onChangeCallback, onSubmit, isLoading };
};
