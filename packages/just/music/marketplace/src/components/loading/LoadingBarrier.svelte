<script lang="ts">
    import type { Snippet } from "svelte";
    import { refreshAll } from "$app/navigation";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { smallTextClass } from "../../lib/common/styles";
    import { Card } from "../cards";

    interface Props {
        isLoading: boolean;
        children: Snippet;
    }

    const { isLoading, children }: Props = $props();

    let dots = $state(0);
    function animateDots() {
        dots = (dots + 1) % 4;
        setTimeout(animateDots, 500);
    }
    animateDots();

    let refreshTimeout: ReturnType<typeof setTimeout> | undefined = $state();
    function refresh() {
        refreshAll();
        refreshTimeout = setTimeout(refresh, 3000);
    }

    $effect(() => {
        isLoading ? refresh() : clearTimeout(refreshTimeout);
    });
</script>

{#if isLoading}
    <Card padding class="flex w-fit items-center gap-3 text-xl">
        <Icon icon="eos-icons:bubble-loading" class="size-6" />
        <span>Loading{".".repeat(dots)}{@html "&nbsp;".repeat(3 - dots)}</span>
    </Card>
    <p class={clsx("mt-4", smallTextClass)}>This page automatically refreshes every 3 seconds.</p>
{:else}
    {@render children()}
{/if}
