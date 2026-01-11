<script lang="ts">
    import type { PageData } from "./$types";
    import { BackButton } from "../../components/buttons";
    import { Card } from "../../components/cards";
    import { LoadingBarrier } from "../../components/loading";
    import { H1 } from "../../components/texts";
    import { smallTextClass } from "../../lib/common/styles";
    import { displayTrack } from "../../lib/common/track";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { duplicates, isStoreReady } = $derived(data);
</script>

<BackButton />
<H1>Duplicates</H1>
<LoadingBarrier isLoading={!isStoreReady}>
    {#if duplicates.length}
        <ul class="grid gap-4">
            {#each duplicates as duplicateTracks}
                <li>
                    <Card padding>
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
        </ul>
    {:else}
        <p class="text-center text-xl font-bold">No duplicates found! ✅</p>
    {/if}
</LoadingBarrier>
