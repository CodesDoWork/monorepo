<script lang="ts">
    import { clsx } from "clsx";

    interface Props {
        showOnPx?: number;
        text: string;
    }

    const { showOnPx = 300, text }: Props = $props();
    let hidden = $state(true);

    const goTop = () => document.body.scrollIntoView({ behavior: "smooth" });
    const scrollContainer = () => document.documentElement || document.body;
    const handleOnScroll = () =>
        scrollContainer() && (hidden = scrollContainer().scrollTop <= showOnPx);

    const buttonClass = $derived(
        clsx(
            "fixed bottom-4 right-4 z-20",
            "rounded bg-(--page-color) px-2 py-1 text-sm font-bold",
            hidden && "invisible opacity-0",
            "transition-all duration-500",
        ),
    );
</script>

<svelte:window onscroll={handleOnScroll} />
<button class={buttonClass} onclick={goTop} onkeypress={goTop}>↑ {text}</button>
