<script lang="ts">
    import { Layout } from "@cdw/monorepo/just-shared-svelte-components";
    import Icon from "@iconify/svelte";
    import { getBSLData } from "../lib/client/bsl.svelte";
    import { setBSLContext } from "../lib/client/contexts/bsl";
    import "../app.css";

    const { children } = $props();

    const bsl = getBSLData();
    setBSLContext(bsl);

    let loadingDots = $state(0);
    function updateLoadingDots() {
        loadingDots = (loadingDots + 1) % 4;
        if (bsl.isLoading) {
            setTimeout(updateLoadingDots, 500);
        }
    }

    updateLoadingDots();
</script>

<Layout>
    <main class="flex min-h-screen flex-col">
        {#if bsl.isLoading}
            <div class="m-auto flex items-center gap-8">
                <Icon icon="eos-icons:bubble-loading" class="size-24" />
                <span class="w-96 text-4xl">
                    Loading you BSL Data{".".repeat(loadingDots)}
                </span>
            </div>
        {:else}
            {@render children?.()}
        {/if}
    </main>
</Layout>
