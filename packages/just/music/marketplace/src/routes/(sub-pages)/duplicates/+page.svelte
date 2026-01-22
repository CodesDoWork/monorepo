<script lang="ts">
    import type { PageData } from "./$types";
    import { VirtualList } from "@cdw/monorepo/shared-svelte-components/virtual-list";
    import { clsx } from "clsx";
    import { Card } from "../../../components/cards";
    import { LoadingBarrier } from "../../../components/loading";
    import { getPairs } from "../../../lib/client/get-pairs";
    import { smallTextClass } from "../../../lib/common/styles";
    import { displayTrack } from "../../../lib/common/track";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { duplicates, isStoreReady } = $derived(data);
    const pairs = $derived(getPairs([...duplicates, ...duplicates, ...duplicates, ...duplicates]));
</script>

<LoadingBarrier isLoading={!isStoreReady}>
    {#if duplicates.length}
        <VirtualList itemContainerClass={clsx("last:pb-6")} items={pairs}>
            {#snippet children(pair)}
                <div class="grid grid-cols-2">
                    {#each pair as duplicateTracks}
                        <li class="p-2">
                            <Card padding class="size-full">
                                <ul class="ml-4 list-disc space-y-2">
                                    {#each duplicateTracks as track}
                                        <li>
                                            <p>{displayTrack(track)}</p>
                                            <ul>
                                                {#each track.paths as path}
                                                    <li class={smallTextClass}>{path}</li>
                                                {/each}
                                            </ul>
                                        </li>
                                    {/each}
                                </ul>
                            </Card>
                        </li>
                    {/each}
                </div>
            {/snippet}
        </VirtualList>
    {:else}
        <p class="text-center text-xl font-bold">No duplicates found! ✅</p>
    {/if}
</LoadingBarrier>
