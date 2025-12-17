import { clsx } from "clsx";

export const headlineBaseClasses = clsx(
    `
        font-semibold tracking-tight text-pretty text-(--primary)
        dark:text-(--primary)
    `,
);

export const aHoverAnimation = clsx(
    `
        before:absolute before:right-0 before:bottom-0 before:inline before:h-0.5 before:w-0
        before:max-w-full before:bg-(--primary) before:transition-all before:duration-500
        hover:before:left-0 hover:before:w-full hover:before:bg-(--primary-900)
        dark:hover:before:bg-(--primary-400)
    `,
);

const listBaseClasses = clsx("my-2 ml-8 list-outside");

export const textBaseClasses = clsx("md:text-lg");
export const textColorClasses = clsx(
    `
        text-gray-900
        dark:text-gray-200
    `,
);
export const textBaseColorClasses = clsx(textBaseClasses, textColorClasses);

export const smallTextClasses = clsx(`
    text-sm/6 text-gray-800
    dark:text-gray-300
`);

export const typographyClassMap = {
    a: clsx(
        textBaseClasses,
        `
            relative text-(--primary) transition-colors
            hover:text-(--primary-900)
            dark:hover:text-(--primary-400)
        `,
        aHoverAnimation,
    ),
    p: clsx(
        textBaseColorClasses,
        `
            has-[+p]:mb-2
            md:has-[+p]:mb-4
        `,
    ),
    h1: clsx(
        headlineBaseClasses,
        `
            mt-6 mb-3 text-2xl
            md:mt-12 md:mb-6 md:text-3xl
        `,
    ),
    h2: clsx(
        headlineBaseClasses,
        `
            mt-5 mb-2 text-xl
            md:mt-10 md:mb-5 md:text-2xl
        `,
    ),
    h3: clsx(
        headlineBaseClasses,
        `
            mt-4 mb-1 text-lg
            md:mt-8 md:mb-4 md:text-xl
        `,
    ),
    h4: clsx(
        headlineBaseClasses,
        `
            mt-4 mb-1 text-base
            md:text-lg/8
        `,
    ),
    h5: clsx(headlineBaseClasses, "text-sm/6"),
    ol: clsx(listBaseClasses, "list-decimal"),
    ul: clsx(listBaseClasses, "list-disc"),
    li: clsx(textBaseColorClasses),
};
