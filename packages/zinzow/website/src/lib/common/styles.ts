import { clsx } from "clsx";

export const headlineBaseClasses = clsx(
    `
        text-primary font-semibold tracking-tight text-pretty
        dark:text-primary
    `,
);

export const aHoverAnimation = clsx(
    `
        before:bg-primary before:absolute before:right-0 before:bottom-0 before:inline before:h-0.5
        before:w-0 before:max-w-full before:transition-all before:duration-500
        hover:before:bg-primary-900 hover:before:left-0 hover:before:w-full
        dark:hover:before:bg-primary-400
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

export const stylesMap = {
    a: clsx(
        textBaseClasses,
        `
            text-primary relative transition-colors
            hover:text-primary-900
            dark:hover:text-primary-400
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
    input: clsx(
        `
            focus:outline-primary focus:ring-0 focus:outline-2 focus:-outline-offset-2
            block w-full rounded-md border-0 bg-white px-3.5 py-2 text-base text-gray-900 outline
            -outline-offset-1 outline-gray-300
            dark:bg-white/5 dark:text-white dark:outline-white/10
        `,
    ),
    button: clsx(`
        bg-primary cursor-pointer rounded-md px-3.5 py-2.5 text-center text-sm font-semibold
        text-white shadow-sm transition-colors duration-100
        focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2
        hover:bg-primary-400
        dark:hover:bg-primary-600
    `),
};
