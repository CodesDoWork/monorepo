import { clsx } from "clsx";

export const smallTextClass = clsx(`
    text-sm text-wrap text-gray-500 transition-colors
    group-hover/card:text-gray-600
    dark:group-hover/card:text-gray-400
`);

export const inputClass = clsx(
    `
        focus:outline-primary focus:ring-0 focus:outline-2 focus:-outline-offset-2
        block w-full rounded-md border-0 bg-white px-3.5 py-2 text-base text-gray-900 outline
        -outline-offset-1 outline-gray-300
        dark:bg-white/5 dark:text-white dark:outline-white/10
    `,
);
