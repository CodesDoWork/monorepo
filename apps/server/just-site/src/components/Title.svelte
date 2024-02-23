<script lang="ts">
    import Heading from "./Heading.svelte";

    export let title = "";
</script>

<Heading
    animateText={title}
    blinkCursor={true}
    class="text-3xl sm:text-4xl md:text-5xl xl:text-6xl select-none mb-6 text-center drop-shadow-lg dark:text-primary-500 transition-colors"
    commandStyle={false}
    level="h1" />
