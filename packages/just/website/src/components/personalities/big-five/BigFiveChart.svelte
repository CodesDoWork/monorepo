<script lang="ts">
    import type { ChartData } from "../chart-data.svelte";
    import type { ChartDataInfo } from "./types";
    import { formatNumber } from "@cdw/monorepo/shared-utils/numbers";
    import { clsx } from "clsx";
    import { fade } from "svelte/transition";

    interface Props {
        class?: string;
        chartData: ChartData<ChartDataInfo>[];
        drawGroups?: boolean;
        currentLanguageCode: string;
    }

    const {
        class: className,
        chartData,
        drawGroups = false,
        currentLanguageCode,
    }: Props = $props();

    let chartWidth = $state(0);
    let chartHeight = $state(0);
    const minY = 20;
    const maxY = 80;
    const yRange = maxY - minY;

    const getY = (val: number) => chartHeight - ((val - minY) / yRange) * chartHeight;

    const pointWidth = $derived(
        chartWidth / (chartData.length + 1 + (drawGroups ? chartData.length / 3 - 1 : 0)),
    );

    let hoveredItem = $state<ChartData<ChartDataInfo> | null>(null);
</script>

<div class={clsx(className, "relative size-full overflow-hidden rounded-lg bg-white shadow-md")}>
    {#if hoveredItem}
        <span
            transition:fade={{ duration: 50 }}
            class="
                absolute bottom-1 left-1/2 z-20 w-max -translate-x-1/2 rounded-md bg-sky-600 px-2
                py-1 text-center text-white shadow-lg
            ">
            {hoveredItem.name}
            {formatNumber(hoveredItem.info.y, 1, currentLanguageCode)}
        </span>
    {/if}
    <svg
        bind:clientWidth={chartWidth}
        bind:clientHeight={chartHeight}
        class="h-full w-full overflow-visible"
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        preserveAspectRatio="none">
        <rect class="w-full fill-sky-700/70" y={getY(80)} height={getY(70) - getY(80)} />
        <rect class="w-full fill-sky-700/50" y={getY(70)} height={getY(60) - getY(70)} />
        <rect class="w-full fill-sky-700/30" y={getY(60)} height={getY(40) - getY(60)} />
        <rect class="w-full fill-sky-700/50" y={getY(40)} height={getY(30) - getY(40)} />
        <rect class="w-full fill-sky-700/70" y={getY(30)} height={getY(20) - getY(30)} />
        <line class="stroke-white stroke-1" x1="0" x2="100%" y1={getY(50)} y2={getY(50)} />

        {#each chartData as point, idx}
            {@const groupOffset = drawGroups ? Math.floor(idx / 3) : 0}
            {@const cx = pointWidth * (idx + 1 + groupOffset)}
            {@const high = point.info.y + point.value.current}
            {@const low = point.info.y - point.value.current}
            {@const progress =
                point.value.current / (point.value.target || Number.POSITIVE_INFINITY)}
            {@const diamondSize = `${0.55 * progress}rem`}
            {@const hoverBoxPadding = 15}
            <g
                role="img"
                class="group cursor-pointer"
                onmouseenter={() => (hoveredItem = point)}
                onmouseleave={() => (hoveredItem = null)}>
                <rect
                    x={cx - hoverBoxPadding / 2}
                    y={getY(high) - hoverBoxPadding / 2}
                    width={hoverBoxPadding}
                    height={getY(low) - getY(high) + hoverBoxPadding}
                    fill="transparent"
                    pointer-events="all" />
                <line
                    x1={cx}
                    x2={cx}
                    y1={getY(high)}
                    y2={getY(low)}
                    stroke="black"
                    stroke-width="2" />
                <line
                    x1={cx - 8}
                    x2={cx + 8}
                    y1={getY(high)}
                    y2={getY(high)}
                    stroke="black"
                    stroke-width="2" />
                <line
                    x1={cx - 8}
                    x2={cx + 8}
                    y1={getY(low)}
                    y2={getY(low)}
                    stroke="black"
                    stroke-width="2" />
                <rect
                    x={cx - 6}
                    y={getY(point.info.y) - 6}
                    width={diamondSize}
                    height={diamondSize}
                    fill="black"
                    transform={`rotate(45, ${cx}, ${getY(point.info.y)})`} />
            </g>

            {#if drawGroups && (idx + 1) % 3 === 0 && idx !== chartData.length - 1}
                {@const dividerCx = pointWidth * (idx + 2 + groupOffset)}
                <line
                    x1={dividerCx}
                    x2={dividerCx}
                    y1={0}
                    y2={chartHeight}
                    stroke="black"
                    stroke-dasharray="3 3"
                    stroke-width="1" />
            {/if}
        {/each}
    </svg>
</div>
