<script lang="ts">
    import { clsx } from "clsx";
    import Heading from "./Heading.svelte";

    
    interface Props {
        class?: string;
        title?: string;
        small?: boolean;
    }

    let { class: className = "", title = "", small = false }: Props = $props();

    let headingClass = $derived(clsx(
        "select-none !drop-shadow-lg",
        !small &&
            "mt-0 text-center !text-3xl sm:!text-4xl md:mt-6 md:!text-5xl lg:mt-12 xl:!text-6xl",
        className,
    ));
</script>

<Heading
    animateText={title}
    blinkCursor={!small}
    class={headingClass}
    commandStyle={small}
    level="h1" />
