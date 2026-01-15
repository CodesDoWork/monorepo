import { clsx } from "clsx";

export const smallTextClass = clsx(`
    text-sm text-wrap text-gray-500 transition-colors
    group-hover/card:text-gray-600
    dark:group-hover/card:text-gray-400
`);

export const buttonClass = clsx(`
    bg-primary cursor-pointer rounded-md p-2 text-white shadow-sm transition-colors
    hover:bg-primary-400 hover:shadow-md
    dark:hover:bg-primary-600
`);
