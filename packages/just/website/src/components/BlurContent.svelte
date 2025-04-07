<script lang="ts">
    import type { Snippet } from "svelte";
    import { onNavigate } from "$app/navigation";
    import { onDestroy, onMount } from "svelte";
    import { blur } from "svelte/transition";
    import type { Route } from "../routes/types";

    const ANIMATION_TIME = 250;

    interface Props {
        children?: Snippet;
        currentRoute: Route;
    }
    const { children, currentRoute }: Props = $props();

    let isVisible = $state(false);

    onMount(() => {
        isVisible = true;
    });

    onNavigate(() => {
        if (!currentRoute?.isHero) {
            isVisible = false;
            setTimeout(() => {
                isVisible = true;
            }, ANIMATION_TIME);
        }
    });

    onDestroy(() => {
        isVisible = false;
    });
</script>

{#if isVisible}
    <div transition:blur={{ duration: ANIMATION_TIME }}>
        {@render children?.()}
    </div>
{/if}
