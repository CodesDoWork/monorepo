<script lang="ts">
    import { clsx } from "clsx";

    export let showOnPx = 300;
    let hidden = true;

    const goTop = () => document.body.scrollIntoView({ behavior: "smooth" });
    const scrollContainer = () => document.documentElement || document.body;
    const handleOnScroll = () =>
        scrollContainer() && (hidden = scrollContainer().scrollTop <= showOnPx);

    $: buttonClass = clsx(
        "fixed right-4 bottom-4 z-20",
        "py-1 px-2 rounded font-bold text-sm bg-[var(--page-color)]",
        hidden && "opacity-0 invisible",
        "transition-all duration-500",
    );
</script>

<svelte:window on:scroll={handleOnScroll} />
<button class={buttonClass} on:click={goTop} on:keypress={goTop}>↑ Back to top</button>
