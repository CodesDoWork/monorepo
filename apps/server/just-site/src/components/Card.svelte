<script lang="ts">
    import { clsx } from "clsx";

    let className = "";
    export { className as class };
    export let style = undefined;
    export let padding = false;
    export let safeBg = false

    $: cardClass = clsx(
        "flex",
        "bg-gray-50 bg-opacity-90 dark:bg-opacity-10 dark:hover:bg-opacity-15",
        safeBg ? "hover:bg-opacity-100" : "hover:bg-opacity-40",
        "rounded-lg transition-all",
        "shadow-md hover:shadow-lg",
        "animate-fadeIn opacity-0",
        "outline outline-1 outline-stone-200 dark:outline-0 dark:hover:outline-0",
        padding && "p-4 sm:p-5 md:p-6",
        className
    );
</script>

<div class={cardClass} style={style}>
    <slot />
</div>
