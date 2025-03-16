<script lang="ts">
    import { clsx } from "clsx";

    interface Props {
        showOnPx?: number;
    }

    let { showOnPx = 300 }: Props = $props();
    let hidden = $state(true);

    const goTop = () => document.body.scrollIntoView({ behavior: "smooth" });
    const scrollContainer = () => document.documentElement || document.body;
    const handleOnScroll = () =>
        scrollContainer() && (hidden = scrollContainer().scrollTop <= showOnPx);

    let buttonClass = $derived(clsx(
        "fixed right-4 bottom-4 z-20",
        "py-1 px-2 rounded font-bold text-sm bg-[var(--page-color)]",
        hidden && "opacity-0 invisible",
        "transition-all duration-500",
    ));
</script>

<svelte:window onscroll={handleOnScroll} />
<button class={buttonClass} onclick={goTop} onkeypress={goTop}>↑ Back to top</button>
