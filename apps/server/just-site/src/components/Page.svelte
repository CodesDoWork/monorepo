<script lang="ts">
    import type { ComponentProps } from "svelte";
    import Header from "./Header.svelte";
    import Title from "./Title.svelte";

    export let header: ComponentProps<Header> = {};
    export let title: ComponentProps<Title> = {};
</script>

<Header {...header} />
<main class="pt-4 pb-16 px-8">
    <Title {...title} />
    <slot />
</main>
