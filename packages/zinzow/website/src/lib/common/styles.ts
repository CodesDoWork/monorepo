import { clsx } from "clsx";

export const colorPrimaryClass = clsx(`
    text-primary
    dark:text-primary-400
`);

export const headlineBaseClasses = clsx(
    colorPrimaryClass,
    "font-semibold tracking-tight text-pretty",
);

export const aHoverAnimation = clsx(
    `
        bg-[linear-gradient(currentColor,currentColor)] bg-size-[0_2px] bg-bottom-right bg-no-repeat
        transition-[color,background-size] duration-500
        hover:bg-size-[100%_2px] hover:bg-bottom-left
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

export const fadeInBottom = clsx("animate-fadeInBT opacity-0");
export const fadeIn = clsx("animate-fadeIn opacity-0");

export const stylesMap = {
    a: clsx(
        textBaseClasses,
        colorPrimaryClass,
        `
            hover:text-primary-900
            dark:hover:text-primary-300
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
    button: clsx(`
        bg-primary
        hover:bg-primary-400
        focus-visible:outline-primary
        dark:hover:bg-primary-600
        cursor-pointer rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white
        shadow-sm transition-colors duration-100
        focus-visible:outline-2 focus-visible:outline-offset-2
    `),
};
