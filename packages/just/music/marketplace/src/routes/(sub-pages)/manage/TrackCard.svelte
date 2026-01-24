<script lang="ts">
    import type { IndexedTrack } from "./types";
    import { Checkbox } from "@cdw/monorepo/shared-svelte-components/forms";
    import { formatDuration } from "@cdw/monorepo/shared-utils/numbers";
    import clsx from "clsx";
    import { Card } from "../../../components/cards";
    import { smallTextClass } from "../../../lib/common/styles";
    import { displayTrack } from "../../../lib/common/track";
    import AudioButton from "./AudioButton.svelte";

    interface Props {
        track: IndexedTrack;
    }

    const { track = $bindable() }: Props = $props();
    let checkbox: HTMLInputElement | undefined = $state();
</script>

<li class="size-full p-2">
    <Card class="size-full">
        <button
            type="button"
            onclick={() => checkbox?.click()}
            class="
                grid size-full cursor-pointer grid-cols-[min-content_1fr_min-content_min-content]
                grid-rows-[min-content_1fr_min-content] items-center gap-2 p-4 text-left text-sm
                md:gap-4 md:text-base
            ">
            <span class="col-span-4 font-bold select-none">{displayTrack(track)}</span>
            <span class={clsx("col-span-2 italic", !track.meta.album && `col-span-4`)}>
                {track.meta.genre}
            </span>
            {#if track.meta.album}
                <span
                    class="
                        col-span-2 text-right text-gray-800
                        dark:text-gray-200
                    ">
                    {track.meta.album}
                </span>
            {/if}
            <Checkbox
                onclick={() => checkbox?.click()}
                boxClass={clsx(`lg:size-6`)}
                svgClass={clsx("lg:size-5")}
                bind:input={checkbox}
                bind:checked={track.has} />
            {#if track.storeFile}
                <AudioButton storeFile={track.storeFile} />
            {:else}
                <span class="text-red-600">No store file found!</span>
            {/if}
            <span class="justify-self-end text-sm">
                {#if track.meta.duration}
                    {formatDuration(track.meta.duration)}
                {/if}
            </span>
            <span class={clsx(smallTextClass, "text-nowrap!")}>
                {track.meta.bitrate ? Math.round(track.meta.bitrate / 1000) : "-"}&thinsp;kbps
            </span>
        </button>
    </Card>
</li>
