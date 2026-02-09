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
            `
                bg-pageColor fixed right-4 bottom-4 z-20 cursor-pointer rounded-sm px-2 py-1 text-sm
                font-bold text-black shadow-md transition-all duration-200
                hover:scale-104 hover:shadow-lg
            `,
            hidden && "invisible opacity-0",
        ),
    );
</script>

<svelte:window onscroll={handleOnScroll} />
<button class={buttonClass} onclick={goTop} onkeypress={goTop}>↑ {text}</button>
