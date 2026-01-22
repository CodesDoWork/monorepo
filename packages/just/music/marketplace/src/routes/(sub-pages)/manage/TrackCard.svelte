<script lang="ts">
    import type { IndexedTrack } from "./types";
    import { Checkbox } from "@cdw/monorepo/shared-svelte-components/forms";
    import { formatDuration } from "@cdw/monorepo/shared-utils/numbers";
    import clsx from "clsx";
    import { Card } from "../../../components/cards";
    import { smallTextClass } from "../../../lib/common/styles";
    import { displayTrack } from "../../../lib/common/track";

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
                grid size-full cursor-pointer grid-cols-[min-content_1fr_auto]
                grid-rows-[min-content_1fr_min-content] items-center gap-4 p-4 text-left
            ">
            <Checkbox
                onclick={() => checkbox?.click()}
                boxClass={clsx("row-span-3 size-6")}
                svgClass={clsx("size-5")}
                bind:input={checkbox}
                bind:checked={track.has} />
            <span class="select-none">{displayTrack(track)}</span>
            <span>{track.meta.album}</span>
            <span class="col-span-2 italic">{track.meta.genre}</span>
            <span class="justify-self-end text-sm">
                {#if track.meta.duration}
                    {formatDuration(track.meta.duration)}
                {/if}
            </span>
            <span class={smallTextClass}>
                {track.meta.bitrate ? Math.round(track.meta.bitrate / 1000) : "-"}&thinsp;kbps
            </span>
        </button>
    </Card>
</li>
