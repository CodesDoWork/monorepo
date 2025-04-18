<script lang="ts">
    import type { PageData } from "../../$types";
    import type { ChartData } from "../chart-data.svelte";
    import type { ChartDataInfo } from "./types";
    import { formatNumber } from "@cdw/monorepo/shared-utils/numbers";
    import { clsx } from "clsx";
    import { fade } from "svelte/transition";

    interface Props {
        class?: string;
        chartData: ChartData<ChartDataInfo>[];
        drawGroups?: boolean;
        currentLanguage: PageData["currentLanguage"];
    }

    const { class: className, chartData, drawGroups = false, currentLanguage }: Props = $props();

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
            class="absolute text-white bottom-1 text-center w-max left-1/2 -translate-x-1/2 z-20 bg-sky-600 rounded-md px-2 py-1 shadow-lg">
            {hoveredItem.name}
            {formatNumber(hoveredItem.info.y, 1, currentLanguage.code)}
        </span>
    {/if}
    <svg
        bind:clientWidth={chartWidth}
        bind:clientHeight={chartHeight}
        class="w-full h-full overflow-visible"
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        preserveAspectRatio="none">
        <rect class="fill-sky-700/70 w-full" y={getY(80)} height={getY(70) - getY(80)} />
        <rect class="fill-sky-700/50 w-full" y={getY(70)} height={getY(60) - getY(70)} />
        <rect class="fill-sky-700/30 w-full" y={getY(60)} height={getY(40) - getY(60)} />
        <rect class="fill-sky-700/50 w-full" y={getY(40)} height={getY(30) - getY(40)} />
        <rect class="fill-sky-700/70 w-full" y={getY(30)} height={getY(20) - getY(30)} />
        <line class="stroke-1 stroke-white" x1="0" x2="100%" y1={getY(50)} y2={getY(50)} />

        {#each chartData as point, idx}
            {@const groupOffset = drawGroups ? Math.floor(idx / 3) : 0}
            {@const cx = pointWidth * (idx + 1 + groupOffset)}
            {@const high = point.info.y + point.value.current}
            {@const low = point.info.y - point.value.current}
            {@const progress =
                point.value.current / (point.value.target || Number.POSITIVE_INFINITY)}
            {@const diamondSize = `${0.55 * progress}rem`}
            <g
                role="img"
                class="group cursor-pointer"
                onmouseenter={() => (hoveredItem = point)}
                onmouseleave={() => (hoveredItem = null)}>
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
