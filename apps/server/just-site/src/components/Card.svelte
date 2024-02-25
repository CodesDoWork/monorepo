<script lang="ts">
    import { clsx } from "clsx";

    let className = "";
    export { className as class };
    export let style = undefined;
    export let padding = false;

    $: cardClass = clsx(
        "flex",
        "bg-white bg-opacity-95 dark:bg-opacity-10 dark:hover:bg-opacity-15",
        "rounded-lg transition-all",
        "shadow-md hover:shadow-lg",
        "animate-fadeIn opacity-0",
        "outline outline-1 outline-stone-100 dark:outline-0 hover:outline-2 dark:hover:outline-0",
        padding && "p-4 sm:p-5 md:p-6",
        className
    );
</script>

<div class={cardClass} style={style}>
    <slot />
</div>
