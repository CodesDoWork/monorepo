import { clsx } from "clsx";

export const headlineBaseClasses = clsx(
    `
        font-semibold tracking-tight text-pretty text-(--primary)
        dark:text-(--primary)
    `,
);

const aHoverAnimation = clsx(
    `
        before:absolute before:right-0 before:bottom-0 before:inline before:h-0.5 before:w-0
        before:max-w-full before:bg-(--primary) before:transition-all before:duration-500
        hover:before:left-0 hover:before:w-full hover:before:bg-(--primary-900)
        dark:hover:before:bg-(--primary-400)
    `,
);

const listBaseClasses = clsx("my-2 ml-8 list-inside");

export const textBaseClasses = clsx("md:text-lg");
export const textColorClasses = clsx(
    `
        text-gray-700
        dark:text-gray-300
    `,
);
export const textBaseColorClasses = clsx(textBaseClasses, textColorClasses);

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
            mt-6 mb-2 text-2xl
            sm:mt-8 sm:mb-3 sm:text-3xl
            md:mt-10 md:mb-4 md:text-4xl
            lg:mt-12 lg:mb-6 lg:text-5xl
        `,
    ),
    h2: clsx(
        headlineBaseClasses,
        `
            mt-4 mb-1 text-xl
            sm:mt-6 sm:mb-2 sm:text-2xl
            md:mt-8 md:mb-3 md:text-3xl
            lg:mt-10 lg:mb-5 lg:text-4xl
        `,
    ),
    h3: clsx(
        headlineBaseClasses,
        `
            mt-4 mb-1 text-lg
            sm:text-xl
            md:mt-6 md:mb-2 md:text-2xl
            lg:mt-8 lg:mb-4 lg:text-3xl
        `,
    ),
    h4: clsx(
        headlineBaseClasses,
        `
            md:text-md
            mt-4 mb-1 text-base
            lg:text-lg/8
        `,
    ),
    h5: clsx(headlineBaseClasses, "text-sm/6"),
    ol: clsx(listBaseClasses, "list-decimal"),
    ul: clsx(listBaseClasses, "list-disc"),
    li: clsx(textBaseColorClasses),
};
