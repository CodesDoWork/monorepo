import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLProps } from "react";
import { clsx } from "clsx";

type InlineActionInputProps = {
    className?: string;
    buttonProps: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
    inputProps: HTMLProps<HTMLInputElement>;
};

export const InlineActionInput = ({
    className,
    buttonProps,
    inputProps,
}: InlineActionInputProps) => {
    const boxClassName = clsx(
        "flex flex-row-reverse rounded-md",
        "shadow-sm hover:shadow focus-within:!shadow-md",
        className,
    );

    const ringClasses = "ring-1 ring-inset ring-primary-500";

    const buttonClassName = clsx(
        "rounded-r-md py-2 px-4 ml-[-1px] text-white peer",
        "bg-primary-500 hover:bg-primary-400 active:bg-primary-500",
        ringClasses,
        "hover:ring-primary-400 active:ring-primary-500",
        buttonProps.className,
    );

    const inputClassName = clsx(
        "min-w-[20rem] rounded-l-md py-2 px-6 outline-none peer sm:text-sm sm:leading-6",
        "text-gray-900 placeholder:text-gray-400",
        ringClasses,
        "peer-hover:ring-primary-400 peer-active:ring-primary-500",
        inputProps.className,
    );

    return (
        <div className={boxClassName}>
            <button {...buttonProps} className={buttonClassName} />
            <input {...inputProps} className={inputClassName} />
        </div>
    );
};
