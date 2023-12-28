import { PropsWithChildren } from "react";
import { clsx } from "clsx";
import { useInlineActionInput } from "./useInlineActionInput";
import { Button } from "../buttons/button/Button";

interface InlineActionInputProps {
    className?: string;
    buttonProps: Partial<
        PropsWithChildren<{
            onClick: () => void | Promise<void>;
            className: string;
        }>
    >;
    inputProps: Partial<{
        id: string;
        placeholder: string;
        type: string;
        value: string;
        onChange: (value: string) => void;
        className: string;
        options: {
            key: string;
            value: string;
        }[];
    }>;
    error?: string;
}

export function InlineActionInput({
    className,
    buttonProps,
    inputProps,
    error,
}: InlineActionInputProps) {
    const { onChange, onSubmit } = useInlineActionInput({
        onChange: inputProps.onChange,
        onClick: buttonProps.onClick,
    });

    const boxClassName = getBoxClassName(className);
    buttonProps.className = getButtonClass(buttonProps.className);
    inputProps.className = getInputClass(inputProps.className);

    const input = inputProps.options ? (
        <select {...inputProps} onChange={onChange}>
            {inputProps.options.map(option => (
                <option key={option.key} value={option.key}>
                    {option.value}
                </option>
            ))}
        </select>
    ) : (
        <input {...inputProps} onChange={onChange} />
    );

    return (
        <div>
            <div className={boxClassName}>
                <Button {...buttonProps} onClick={onSubmit} loaderClass="w-4 h-4" />
                {input}
            </div>
            {error && <span className={"text-xs text-error-600"}>{error}</span>}
        </div>
    );
}

const RING_CLASSES = "ring-1 !ring-inset ring-primary-500";

function getBoxClassName(className?: string): string {
    return clsx(
        "flex flex-row-reverse rounded-md",
        "shadow-sm hover:shadow focus-within:!shadow-md transition-shadow",
        className,
    );
}

function getButtonClass(className?: string): string {
    return clsx(
        "rounded-r-md py-2 px-4 ml-[-1px] text-white peer",
        "bg-primary-500 hover:bg-primary-400 active:bg-primary-500",
        RING_CLASSES,
        "hover:ring-primary-400 active:ring-primary-500",
        className,
    );
}

function getInputClass(className?: string): string {
    return clsx(
        "min-w-[20rem] rounded-l-md py-2 px-6 outline-none sm:text-sm sm:leading-6",
        "border-0 bg-white appearance-none",
        "text-gray-900 placeholder:text-gray-400",
        RING_CLASSES,
        "peer-hover:ring-primary-400 peer-active:ring-primary-500",
        className,
    );
}
