<script lang="ts">
    import type { BigFiveProps, ChartDataInfo } from "./types";
    import { clsx } from "clsx";
    import { untrack } from "svelte";
    import { getChartData } from "../chart-data.svelte";
    import BigFiveChart from "./BigFiveChart.svelte";

    interface Props {
        currentLanguageCode: string;
        bigFive: BigFiveProps;
    }

    const { bigFive, currentLanguageCode }: Props = $props();

    const roughChartData = $derived(
        getChartData<ChartDataInfo>([
            {
                name: bigFive.extraversionText,
                value: bigFive.extraversionDeviation,
                color: "black",
                info: {
                    y: bigFive.extraversion,
                },
            },
            {
                name: bigFive.compatibilityText,
                value: bigFive.compassionDeviation,
                color: "black",
                info: {
                    y: bigFive.compatibility,
                },
            },
            {
                name: bigFive.conscientousnessText,
                value: bigFive.conscientiousnessDeviation,
                color: "black",
                info: {
                    y: bigFive.conscientiousness,
                },
            },
            {
                name: bigFive.emotionalStabilityText,
                value: bigFive.emotionalStabilityDeviation,
                color: "black",
                info: {
                    y: bigFive.emotionalStability,
                },
            },
            {
                name: bigFive.opennessText,
                value: bigFive.opennessDeviation,
                color: "black",
                info: {
                    y: bigFive.openness,
                },
            },
        ]),
    );

    const detailedChartData = $derived(
        getChartData<ChartDataInfo>([
            {
                name: bigFive.sociabilityText,
                value: bigFive.sociabilityDeviation,
                color: "black",
                info: {
                    y: bigFive.sociability,
                },
            },
            {
                name: bigFive.assertivenessText,
                value: bigFive.assertivenessDeviation,
                color: "black",
                info: {
                    y: bigFive.assertiveness,
                },
            },
            {
                name: bigFive.energyLevelText,
                value: bigFive.energyLevelDeviation,
                color: "black",
                info: {
                    y: bigFive.energyLevel,
                },
            },
            {
                name: bigFive.compassionText,
                value: bigFive.compassionDeviation,
                color: "black",
                info: {
                    y: bigFive.compassion,
                },
            },
            {
                name: bigFive.courtesyText,
                value: bigFive.courtesyDeviation,
                color: "black",
                info: {
                    y: bigFive.courtesy,
                },
            },
            {
                name: bigFive.trustText,
                value: bigFive.trustDeviation,
                color: "black",
                info: {
                    y: bigFive.trust,
                },
            },
            {
                name: bigFive.loveOfOrderText,
                value: bigFive.loveOfOrderDeviation,
                color: "black",
                info: {
                    y: bigFive.loveOfOrder,
                },
            },
            {
                name: bigFive.diligenceText,
                value: bigFive.diligenceDeviation,
                color: "black",
                info: {
                    y: bigFive.diligence,
                },
            },
            {
                name: bigFive.reliabilityText,
                value: bigFive.reliabilityDeviation,
                color: "black",
                info: {
                    y: bigFive.reliability,
                },
            },
            {
                name: bigFive.serenityText,
                value: bigFive.serenityDeviation,
                color: "black",
                info: {
                    y: bigFive.serenity,
                },
            },
            {
                name: bigFive.lightheartednessText,
                value: bigFive.lightheartednessDeviation,
                color: "black",
                info: {
                    y: bigFive.lightheartedness,
                },
            },
            {
                name: bigFive.feelingStabilityText,
                value: bigFive.feelingStabilityDeviation,
                color: "black",
                info: {
                    y: bigFive.feelingStability,
                },
            },
            {
                name: bigFive.interestInArtAndCultureText,
                value: bigFive.interestInArtAndCultureDeviation,
                color: "black",
                info: {
                    y: bigFive.interestInArtAndCulture,
                },
            },
            {
                name: bigFive.intellectualCuriosityText,
                value: bigFive.intellectualCuriosityDeviation,
                color: "black",
                info: {
                    y: bigFive.intellectualCuriosity,
                },
            },
            {
                name: bigFive.ingenuityText,
                value: bigFive.ingenuityDeviation,
                color: "black",
                info: {
                    y: bigFive.ingenuity,
                },
            },
        ]),
    );

    function animateChartData(showDetail: boolean) {
        const chartData = showDetail ? detailedChartData : roughChartData;
        const originalValues = chartData.map(data => data.value.target);
        Promise.all(chartData.map(data => data.value.set(0, { duration: 0 }))).then(() =>
            chartData.forEach((data, idx) => data.value.set(originalValues[idx])),
        );
    }

    let showDetail = $state(false);
    $effect(() => {
        void showDetail;
        untrack(() => animateChartData(showDetail));
    });

    const textClass = "transition-colors text-xs sm:text-sm md:text-xs lg:text-sm";
    const normalText = "text-slate-500 dark:text-slate-400";
    const selectedText = "text-black dark:text-white";
</script>

<div class="grid h-full grid-rows-[1fr_auto] gap-4">
    <BigFiveChart
        {currentLanguageCode}
        chartData={showDetail ? detailedChartData : roughChartData}
        drawGroups={showDetail} />
    <div
        class="
            mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-x-2
            sm:gap-x-4
            md:gap-x-2
            lg:gap-x-4
        ">
        <span class={clsx(textClass, showDetail ? normalText : selectedText)}>
            {bigFive.defaultView}
        </span>

        <div class="relative h-5 w-10">
            <button
                aria-label="toggle background"
                onclick={() => (showDetail = !showDetail)}
                class="absolute h-full w-full rounded-full bg-sky-500 align-middle">
            </button>
            <button
                aria-label="toggle foreground"
                onclick={() => (showDetail = !showDetail)}
                class={clsx(
                    `
                        absolute left-0 aspect-square h-full transform rounded-full border
                        border-gray-300 bg-white shadow-md transition-all duration-300
                    `,
                    showDetail ? "translate-x-6" : "translate-x-0",
                )}>
            </button>
        </div>

        <span class={clsx(textClass, showDetail ? selectedText : normalText)}>
            {bigFive.detailView}
        </span>
    </div>
</div>
