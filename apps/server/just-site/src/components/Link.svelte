<script lang="ts">
    import { clsx } from "clsx";

    let className = "";
    export { className as class };
    export let href: string;
    export let title: string;
    export let external = false;
    export let button = false;
    export let noStyle = false;

    $: aClass = clsx(
        "font-mono transition rounded-md",
        button && [
            "dark:text-white p-3",
            "bg-white dark:bg-opacity-10",
            "hover:bg-accent-500 dark:hover:bg-opacity-50 dark:hover:bg-secondary-500 hover:rotate-3",
            "shadow-md hover:shadow-lg",
            "origin-top-left",
        ],
        !button && !noStyle && [
            "p-1 hover:text-white dark:hover:text-black text-accent-700 dark:text-accent-500 hover:bg-accent-700 dark:hover:bg-accent-500",
        ],
        className,
    );
</script>

<a class={aClass}
   href={href}
   rel={external ? "noopener" : undefined}
   target={external ? "_blank" : undefined}
   title={title}>
    <slot />
</a>
