import { HTMLProps } from "react";
import { clsx } from "clsx";

type LabelProps = HTMLProps<HTMLLabelElement>;

export const Label = (props: LabelProps) => {
    const className = clsx(
        "block mb-1 text-sm font-semibold leading-6 text-gray-900",
        props.className,
    );

    return <label {...props} className={className} />;
};
