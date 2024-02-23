<script lang="ts">
    import Heading from "./Heading.svelte";
    import { clsx } from "clsx";

    let className = "";
    export { className as class };
    export let title = "";
    export let small = false;

    $: headingClass = clsx(
        small ? "text-xl sm:text-2xl md:text-3xl xl:text-4xl" : "text-3xl sm:text-4xl md:text-5xl xl:text-6xl",
        "dark:text-primary-500 transition-colors",
        "select-none mb-6 drop-shadow-lg",
        !small && "text-center mt-6 md:mt-12"
    );
</script>

<Heading
    animateText={title}
    blinkCursor={!small}
    class={headingClass}
    commandStyle={small}
    level="h1" />
