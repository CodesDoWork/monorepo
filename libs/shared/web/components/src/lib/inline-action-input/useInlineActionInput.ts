import { ChangeEvent, useCallback } from "react";

type UseInlineActionInputProps = {
    onChange?: (value: string) => void;
    onClick?: () => void | Promise<void>;
};

export const useInlineActionInput = ({ onChange, onClick }: UseInlineActionInputProps) => {
    const onChangeCallback = useCallback(
        (e: ChangeEvent) => {
            onChange && onChange((e.target as HTMLInputElement).value);
        },
        [onChange],
    );

    const onSubmit = useCallback(async () => {
        onClick && (await onClick());
    }, [onClick]);

    return { onChange: onChangeCallback, onSubmit };
};
