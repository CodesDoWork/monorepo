import { clsx } from "clsx";

export const smallTextClass = clsx(`
    text-sm text-wrap wrap-anywhere text-gray-500 transition-colors
    group-hover/card:text-gray-600
    dark:group-hover/card:text-gray-400
`);

export const buttonClass = clsx(`
    bg-primary
    hover:bg-primary-400
    dark:hover:bg-primary-600
    cursor-pointer rounded-md p-2 text-white shadow-sm transition-colors
    hover:shadow-md
`);
