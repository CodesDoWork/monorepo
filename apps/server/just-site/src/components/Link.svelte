<script lang="ts">
    import { clsx } from "clsx";

    let className = "";
    export { className as class };
    export let href: string;
    export let title: string;
    export let external = false;
    export let button = false;
    export let icon = false;

    $: aClass = clsx(
        "font-mono transition rounded-md",
        button && [
            "dark:text-white p-3",
            "bg-white dark:bg-opacity-10",
            "hover:bg-accent-500 dark:hover:bg-opacity-50 dark:hover:bg-secondary-500 hover:rotate-3",
            "shadow-md hover:shadow-lg",
            "origin-top-left",
        ],
        !button && !icon && [
            "p-1 hover:text-black text-brandOrange-500 dark:text-brandPink-500 hover:bg-brandOrange-500 dark:hover:bg-brandPink-500",
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
