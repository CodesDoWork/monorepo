import { clsx } from "clsx";

const headingBaseClasses = clsx(
    `
        text-pageColor
        dark:text-pageColor
        cursor-default font-mono font-bold drop-shadow-sm transition-colors
    `,
);

export const commandStyleClasses = clsx("before:mr-2 before:opacity-75 before:content-['>']");

export const aHoverAnimation = clsx(
    `
        bg-[linear-gradient(currentColor,currentColor)] bg-size-[0_2px] bg-bottom-right bg-no-repeat
        transition-[color,background-size]! duration-500
        hover:bg-size-[100%_2px] hover:bg-bottom-left
    `,
);

const listBaseClasses = clsx("my-2 ml-8 list-outside");

export const textBaseClasses = clsx("");
export const textColorClasses = clsx(
    `
        text-gray-800
        dark:text-gray-200
    `,
);
export const textBaseColorClasses = clsx(textBaseClasses, textColorClasses);

export const smallTextClasses = clsx(`
    text-sm/6 text-gray-800
    dark:text-gray-300
`);

export const stylesMap = {
    a: clsx(
        textBaseClasses,
        `
            text-pageColor
            hover:text-pageColor-600
            dark:hover:text-pageColor-400
            transition-colors
        `,
        aHoverAnimation,
    ),
    p: clsx(
        textBaseColorClasses,
        `
            has-[+p]:mb-2
            md:has-[+p]:mb-2
        `,
    ),
    h1: clsx(
        headingBaseClasses,
        `
            mt-6 mb-3 text-2xl
            md:mt-12 md:mb-6 md:text-3xl
            xl:text-4xl
        `,
    ),
    h2: clsx(
        headingBaseClasses,
        `
            mt-5 mb-2 text-xl
            md:mt-10 md:mb-5 md:text-2xl
            xl:text-3xl
        `,
    ),
    h3: clsx(
        headingBaseClasses,
        `
            mt-4 mb-1 text-lg
            md:mt-8 md:mb-4 md:text-xl
            xl:text-2xl
        `,
    ),
    h4: clsx(
        headingBaseClasses,
        `
            mt-4 mb-1 text-base
            md:text-lg/8
            xl:text-xl
        `,
    ),
    h5: clsx(
        headingBaseClasses,
        `
            my-2
            lg:text-lg
        `,
    ),
    h6: clsx(headingBaseClasses, `mt-6 mb-3 text-sm`),
    ol: clsx(listBaseClasses, "list-decimal"),
    ul: clsx(listBaseClasses, "list-disc"),
    li: clsx(textBaseColorClasses),
} as const;
