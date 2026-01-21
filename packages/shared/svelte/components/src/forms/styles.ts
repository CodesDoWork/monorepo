import { clsx } from "clsx";

export const inputClass = clsx(
    `
        focus:outline-primary
        block w-full rounded-md border-0 bg-white px-3.5 py-2 text-base text-gray-900 outline
        -outline-offset-1 outline-gray-300
        focus:ring-0 focus:outline-2 focus:-outline-offset-2
        dark:bg-white/5 dark:text-white dark:outline-white/10
    `,
);

export const buttonClass = clsx(`
    bg-primary
    focus-visible:outline-primary
    hover:bg-primary-400
    dark:hover:bg-primary-600
    cursor-pointer rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm
    transition-colors duration-100
    focus-visible:outline-2 focus-visible:outline-offset-2
`);
