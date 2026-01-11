<script lang="ts">
    import type { PageData } from "./$types";
    import { BackButton } from "../../components/buttons";
    import { Card } from "../../components/cards";
    import { ErrorBadge } from "../../components/error-badge";
    import { LoadingBarrier } from "../../components/loading";
    import { H1 } from "../../components/texts";
    import { smallTextClass } from "../../lib/common/styles";
    import { displayTrack } from "../../lib/common/track";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { tracks, isStoreReady, userLib } = $derived(data);

    let showAllTracks = $state(false);
    const displayedTracks = $derived(
        showAllTracks ? tracks : tracks.filter(t => t.paths.some(path => path.startsWith(userLib))),
    );
</script>

<BackButton />
<H1>Metadata</H1>
<LoadingBarrier isLoading={!isStoreReady}>
    <div>
        <input type="checkbox" id="showAllTracks" bind:checked={showAllTracks} />
        <label for="showAllTracks">Show all tracks</label>
    </div>
    <ul class="mt-4 grid grid-cols-2 gap-4">
        {#each displayedTracks as track}
            <li class="grid">
                <Card
                    padding
                    class="
                        grid grid-cols-[1fr_min-content] grid-rows-[min-content_1fr_min-content]
                        items-start gap-2
                    ">
                    <span>{displayTrack(track)}</span>
                    <div class="flex items-center gap-1">
                        <ErrorBadge
                            messages={track.errors}
                            icon="material-symbols:error"
                            iconClass="*:fill-red-500" />
                        <ErrorBadge messages={track.warnings} icon="fluent-color:warning-16" />
                    </div>
                    <span class="col-span-2 italic">
                        {track.meta.genre?.join(", ") ?? "No Genres"}
                    </span>
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
    </ul>
</LoadingBarrier>
