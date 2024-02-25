<script lang="ts">
    import { useTechIcon } from "../stores/techIcon.js";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";

    let className = "";
    export { className as class };
    export let technology: string;
    export let tag: string;

    const techIcon = useTechIcon(technology);
    const technologyClass = clsx(
        "flex items-center gap-1 bg-black bg-opacity-10 p-2 rounded",
        className
    )
</script>

<svelte:element class={technologyClass} this={tag}>
    <span>{technology}</span>
    <Icon class="w-6 h-6" icon={$techIcon} />
</svelte:element>
