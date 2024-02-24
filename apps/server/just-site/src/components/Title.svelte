<script lang="ts">
    import Heading from "./Heading.svelte";
    import { clsx } from "clsx";

    let className = "";
    export { className as class };
    export let title = "";
    export let small = false;

    $: headingClass = clsx(
        "select-none !drop-shadow-lg",
        !small && "text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-center mt-0 md:mt-6 lg:mt-12",
        className
    );
</script>

<Heading
    animateText={title}
    blinkCursor={!small}
    class={headingClass}
    commandStyle={small}
    level="h1" />
