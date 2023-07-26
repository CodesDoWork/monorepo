import { ChangeEvent, useCallback } from "react";

type UseInlineActionInputProps = {
    onChange?: (value: string) => void;
};

export const useInlineActionInput = ({ onChange }: UseInlineActionInputProps) => {
    const onChangeCallback = useCallback(
        (e: ChangeEvent) => {
            onChange && onChange((e.target as HTMLInputElement).value);
        },
        [onChange],
    );

    return { onChange: onChangeCallback };
};
