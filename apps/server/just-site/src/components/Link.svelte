<script lang="ts">
    import { clsx } from "clsx";

    let className = "";
    export { className as class };
    export let href: string;
    export let title: string;
    export let external = false;
    export let button = false;

    $: aClass = clsx(
        "dark:text-white font-mono",
        button && [
            "p-3 rounded-md",
            "bg-white dark:bg-opacity-10",
            "hover:bg-accent-500 dark:hover:bg-opacity-50 dark:hover:bg-secondary-500 hover:rotate-3",
            "shadow-md hover:shadow-lg",
            "transition origin-top-left"
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
