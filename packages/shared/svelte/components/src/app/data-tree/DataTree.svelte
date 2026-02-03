<script lang="ts">
    import { formatValue } from "@cdw/monorepo/shared-utils/objects";
    import Self from "./DataTree.svelte";

    interface Props {
        data: object;
        path?: string;
        hasUnit?: boolean;
        filterEntries?: (entry: [string, unknown]) => boolean;
        translations?: Record<string, string>;
    }

    const { data, path, hasUnit, filterEntries, translations }: Props = $props();

    const getFullKey = $derived((key: string): string => {
        return path ? `${path}.${key}` : key;
    });

    const getKeyDisplay = $derived((key: string): string => {
        return translations ? translations[getFullKey(key)] || key : key;
    });

    const entries = $derived.by(() => {
        if (!data) {
            return [];
        }

        const objEntries = Object.entries(data);
        return filterEntries ? objEntries.filter(filterEntries) : objEntries;
    });
</script>

<div
    class="
        space-y-1 border-l-2 border-gray-200 pl-4
        dark:border-gray-700
    ">
    {#each entries as [key, value]}
        <div
            class="
                text-sm text-gray-800
                dark:text-gray-200
            ">
            {#if typeof value === "object" && !Array.isArray(value)}
                <span
                    class="
                        text-primary-600
                        dark:text-primary-400
                        font-semibold capitalize
                    ">
                    {getKeyDisplay(key)}:
                </span>
                <Self
                    data={value}
                    path={getFullKey(key)}
                    {hasUnit}
                    {filterEntries}
                    {translations} />
            {:else}
                <div
                    class="
                        flex justify-between border-b border-gray-100 py-1
                        last:border-0
                        dark:border-gray-700
                    ">
                    <span
                        class="
                            text-gray-500 capitalize
                            dark:text-gray-400
                        ">
                        {getKeyDisplay(key)}
                    </span>
                    <span
                        class="
                            font-mono tracking-tighter text-nowrap text-gray-900
                            dark:text-gray-100
                        ">
                        {formatValue(value)}{#if hasUnit}&thinsp;{key.split("_").pop()}{/if}
                    </span>
                </div>
            {/if}
        </div>
    {/each}
</div>
