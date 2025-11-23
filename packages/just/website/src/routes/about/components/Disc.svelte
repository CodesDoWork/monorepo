<script lang="ts">
    import type { PageData } from "../$types";
    import type { ChartData } from "./chart-data.svelte";
    import { formatNumber } from "@cdw/monorepo/shared-utils/numbers";
    import { clsx } from "clsx";
    import { getChartData } from "./chart-data.svelte";

    interface Props {
        currentLanguage: PageData["currentLanguage"];
        disc: PageData["disc"];
    }

    const { disc, currentLanguage }: Props = $props();
    const chartData = getChartData([
        {
            name: "",
            color: "transparent",
            startValue: 0,
        },
        {
            name: disc.dominanceText,
            color: "oklch(57.7% 0.245 27.325)",
            value: disc.dominance,
        },
        {
            name: disc.influenceText,
            color: "oklch(82.8% 0.189 84.429)",
            value: disc.influence,
        },
        {
            name: disc.steadinessText,
            color: "oklch(72.3% 0.219 149.579)",
            value: disc.steadiness,
        },
        {
            name: disc.conscientousnessText,
            color: "oklch(58.8% 0.158 241.966)",
            value: disc.conscientousness,
        },
    ]);

    const r = 50;
    function describeArc(startAngle: number, endAngle: number) {
        const x1 = r * (1 + Math.cos(startAngle));
        const y1 = r * (1 + Math.sin(startAngle));
        const x2 = r * (1 + Math.cos(endAngle));
        const y2 = r * (1 + Math.sin(endAngle));
        const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

        return `M ${r} ${r} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    }

    const arcData = $derived.by(() => {
        // start left minus half of the overlap of dominance (1/4 = 25%, Math.PI = 180°)
        let angle = Math.PI - ((disc.dominance - 25) / 100) * Math.PI;
        let currentSlice = 0;
        function getPath(dataPoint: ChartData) {
            currentSlice = (dataPoint.value.current / 100) * 2 * Math.PI;
            const path = describeArc(angle, angle + currentSlice);
            angle += currentSlice;
            return path;
        }

        function getTextTransform() {
            const midAngle = (2 * angle - currentSlice) / 2;
            const x = r * (1 + 0.6 * Math.cos(midAngle));
            const y = r * (1 + 0.6 * Math.sin(midAngle));
            return { x, y };
        }

        return chartData.map(dataPoint => ({ path: getPath(dataPoint), ...getTextTransform() }));
    });
</script>

<div
    class={clsx(
        "flex size-full justify-center",
        `
            gap-2
            sm:gap-x-8
            lg:gap-x-4
        `,
        `
            flex-col
            sm:flex-row
            md:flex-col
            lg:flex-row
        `,
    )}>
    <svg
        viewBox={`0 0 ${2 * r} ${2 * r}`}
        class={clsx(
            "h-full overflow-visible p-2 drop-shadow-md",
            "mx-auto flex-1",
            "sm:mx-0 sm:flex-none",
            "md:mx-auto md:flex-1",
            "lg:mx-0 lg:h-auto lg:w-0",
        )}>
        {#each chartData as dataPoint, idx (idx)}
            <g class="group">
                <path
                    d={arcData[idx].path}
                    fill={dataPoint.color}
                    class="
                        origin-center transition
                        group-hover:scale-105 group-hover:drop-shadow-lg
                    " />
                <text
                    x={arcData[idx].x}
                    y={arcData[idx].y}
                    text-anchor="start"
                    style="transform: translate(-0.7rem, 0.25rem);"
                    class="
                        cursor-default text-[0.5rem] opacity-0 transition-opacity
                        group-hover:opacity-100
                    ">
                    {formatNumber(dataPoint.value.target, 1, currentLanguage.code)}&thinsp;%
                </text>
            </g>
        {/each}
    </svg>
    <ul
        class={clsx(
            "my-auto grid w-fit gap-x-4 gap-y-1",
            "mx-auto grid-cols-[min-content_min-content]",
            "sm:mx-0 sm:grid-cols-1",
            "md:mx-auto",
            "lg:mx-0",
        )}>
        {#each chartData as dataPoint}
            {#if dataPoint.name !== ""}
                <li class="flex items-center gap-2">
                    <div class="size-4 rounded" style="background-color: {dataPoint.color}"></div>
                    <span class="text-sm">{dataPoint.name}</span>
                </li>
            {/if}
        {/each}
    </ul>
</div>
