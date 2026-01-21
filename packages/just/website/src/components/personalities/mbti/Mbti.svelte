<script lang="ts">
    import type { MbtiProps } from "./types";
    import { formatNumber } from "@cdw/monorepo/shared-utils/numbers";
    import { clsx } from "clsx";
    import { getChartData } from "../chart-data.svelte";

    interface Props {
        currentLanguageCode: string;
        mbti: MbtiProps;
    }

    interface Trait {
        label: string;
        text: string;
    }

    interface DataPointInfo {
        left: Trait;
        right: Trait;
    }

    const { currentLanguageCode, mbti }: Props = $props();
    const chartData = $derived(
        getChartData<DataPointInfo>([
            {
                name: "ei",
                color: "oklch(60.9% 0.126 221.723)",
                value: mbti.introverted,
                info: {
                    left: { label: "E", text: mbti.extravertedText },
                    right: { label: "I", text: mbti.introvertedText },
                },
            },
            {
                name: "ns",
                color: "oklch(82.8% 0.189 84.429)",
                value: mbti.observant,
                info: {
                    left: { label: "N", text: mbti.intuitiveText },
                    right: { label: "S", text: mbti.observantText },
                },
            },
            {
                name: "tf",
                color: "oklch(62.7% 0.194 149.214)",
                value: mbti.feeling,
                info: {
                    left: { label: "T", text: mbti.thinkingText },
                    right: { label: "F", text: mbti.feelingText },
                },
            },
            {
                name: "pj",
                color: "oklch(38% 0.189 293.745)",
                value: mbti.prospecting,
                info: {
                    left: { label: "J", text: mbti.judgingText },
                    right: { label: "P", text: mbti.prospectingText },
                },
            },
            {
                name: "at",
                color: "oklch(50.5% 0.213 27.518)",
                value: mbti.turbulent,
                info: {
                    left: { label: "A", text: mbti.assertiveText },
                    right: { label: "T", text: mbti.turbulentText },
                },
            },
        ]),
    );

    const textClass = "text-xs";
    const highlightedText = "font-bold text-gray-700 dark:text-white";
    const normalText = "text-gray-400";
</script>

<ul class="mt-4 space-y-6 px-2">
    {#each chartData as dataPoint, idx (idx)}
        {@const highlightLeft = dataPoint.value.current < 50}
        {@const value = highlightLeft ? 100 - dataPoint.value.current : dataPoint.value.current}
        {@const traitText = highlightLeft ? dataPoint.info.left.text : dataPoint.info.right.text}
        <li class="flex h-6 w-full items-center gap-3">
            <span class={clsx(textClass, highlightLeft ? highlightedText : normalText)}>
                {dataPoint.info.left.label}
            </span>

            <div class="relative w-full">
                <div class="h-2 w-full rounded-full" style="background-color: {dataPoint.color};">
                </div>
                <div
                    class="absolute bottom-4 w-max -translate-x-1/2 text-sm"
                    style="left: {dataPoint.value.current}%">
                    {formatNumber(value, 1, currentLanguageCode)}&thinsp;% {traitText}
                </div>
                <div
                    class="
                        absolute top-1/2 size-4 -translate-1/2 rounded-full border-2 border-white
                    "
                    style="background-color: {dataPoint.color}; left: {dataPoint.value.current}%;">
                </div>
            </div>

            <span class={clsx(textClass, highlightLeft ? normalText : highlightedText)}>
                {dataPoint.info.right.label}
            </span>
        </li>
    {/each}
</ul>
