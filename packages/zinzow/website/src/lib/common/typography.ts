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
        hover:before:left-0 hover:before:w-full hover:before:bg-(--primary-600)
        dark:hover:before:bg-(--primary-400)
    `,
);

export const typographyClassMap = {
    a: clsx(
        `
            relative text-(--primary) transition-colors
            hover:text-(--primary-600)
            dark:hover:text-(--primary-400)
        `,
        aHoverAnimation,
    ),
    p: clsx(`
        text-gray-700
        dark:text-gray-300
    `),
    h1: clsx(
        headlineBaseClasses,
        `
            mt-12 mb-6 text-3xl
            sm:text-4xl
            md:text-5xl
        `,
    ),
    h2: clsx(
        headlineBaseClasses,
        `
            mt-8 mb-4 text-2xl
            sm:text-3xl
            md:text-4xl
        `,
    ),
    h3: clsx(
        headlineBaseClasses,
        `
            mt-6 mb-2 text-xl
            sm:text-2xl
            md:text-3xl
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
};
