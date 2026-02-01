import { clsx } from "clsx";

export const buttonClass = clsx(`
    bg-primary
    hover:bg-primary-400
    dark:hover:bg-primary-600
    cursor-pointer rounded-md px-2.5 py-2 text-white shadow-sm transition-colors
    hover:shadow-md
`);
