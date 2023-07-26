import { PropsWithChildren } from "react";
import { clsx } from "clsx";
import { useInlineActionInput } from "./useInlineActionInput";

type InlineActionInputProps = {
    className?: string;
    buttonProps: Partial<
        PropsWithChildren<{
            onClick: () => void;
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
};

export const InlineActionInput = ({
    className,
    buttonProps,
    inputProps,
    error,
}: InlineActionInputProps) => {
    const { onChange } = useInlineActionInput({ onChange: inputProps.onChange });

    const boxClassName = clsx(
        "flex flex-row-reverse rounded-md",
        "shadow-sm hover:shadow focus-within:!shadow-md transition-shadow",
        className,
    );

    const ringClasses = "ring-1 !ring-inset ring-primary-500";

    const buttonClassName = clsx(
        "rounded-r-md py-2 px-4 ml-[-1px] text-white peer",
        "bg-primary-500 hover:bg-primary-400 active:bg-primary-500",
        ringClasses,
        "hover:ring-primary-400 active:ring-primary-500",
        buttonProps.className,
    );

    const inputClassName = clsx(
        "min-w-[20rem] rounded-l-md py-2 px-6 outline-none sm:text-sm sm:leading-6",
        "border-0 bg-white appearance-none",
        "text-gray-900 placeholder:text-gray-400",
        ringClasses,
        "peer-hover:ring-primary-400 peer-active:ring-primary-500",
        inputProps.className,
    );

    const input = inputProps.options ? (
        <select {...inputProps} className={inputClassName} onChange={onChange}>
            {inputProps.options.map(option => (
                <option key={option.key} value={option.key}>
                    {option.value}
                </option>
            ))}
        </select>
    ) : (
        <input {...inputProps} className={inputClassName} onChange={onChange} />
    );

    return (
        <div className={boxClassName}>
            <button {...buttonProps} className={buttonClassName} />
            {input}
            {error && <span className={"text-xs text-error-600"}>{error}</span>}
        </div>
    );
};
