<script lang="ts">
    import type { PageData } from "./$types";
    import { VirtualList } from "@cdw/monorepo/shared-svelte-components/virtual-list";
    import { clsx } from "clsx";
    import { Card } from "../../../components/cards";
    import { ErrorBadge } from "../../../components/error-badge";
    import { LoadingBarrier } from "../../../components/loading";
    import { getPairs } from "../../../lib/client/get-pairs";
    import { smallTextClass } from "../../../lib/common/styles";
    import { displayTrack } from "../../../lib/common/track";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { tracks, isStoreReady, userLib } = $derived(data);

    let showAllTracks = $state(false);
    const displayedTracks = $derived(
        showAllTracks ? tracks : tracks.filter(t => t.paths.some(path => path.startsWith(userLib))),
    );
    const displayedPairs = $derived(getPairs(displayedTracks));
</script>

<LoadingBarrier isLoading={!isStoreReady}>
    <div class="mb-2">
        <input type="checkbox" id="showAllTracks" bind:checked={showAllTracks} />
        <label for="showAllTracks">Show all tracks</label>
    </div>
    <VirtualList itemContainerClass={clsx("last:pb-6")} items={displayedPairs}>
        {#snippet children(pair)}
            <div
                class="
                    grid
                    md:grid-cols-2
                ">
                {#each pair as track}
                    <li class="p-2">
                        <Card
                            padding
                            class="
                                grid h-full grid-cols-[1fr_min-content]
                                grid-rows-[min-content_1fr_min-content] items-start gap-2
                            ">
                            <span>{displayTrack(track)}</span>
                            <div class="flex items-center gap-1">
                                <ErrorBadge
                                    messages={track.errors}
                                    icon="icon-[material-symbols--error]"
                                    iconClass="bg-red-600" />
                                <ErrorBadge
                                    messages={track.warnings}
                                    icon="icon-[fluent-color--warning-16]" />
                            </div>
                            <span class="col-span-2 italic">
                                {track.meta.genre?.join(", ") ?? "No Genres"}
                            </span>
                            {#if track.meta.bitrate}
                                <span class="mt-1 text-sm">
                                    {Math.round(track.meta.bitrate / 1000)}&thinsp;kbps
                                </span>
                            {/if}
                            <ul class="col-span-2 mt-2">
                                {#each track.paths as path}
                                    <li class={smallTextClass}>
                                        {path}
                                    </li>
                                {/each}
                            </ul>
                        </Card>
                    </li>
                {/each}
            </div>
        {/snippet}
    </VirtualList>
</LoadingBarrier>
