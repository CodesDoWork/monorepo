<script lang="ts">
    import { formatValue } from "@cdw/monorepo/shared-utils/objects";
    import { BSL_NAMES, isDetailKey } from "../../lib/client/bsl-item";
    import Self from "./DataTree.svelte";

    interface Props {
        data: object;
        path?: string;
    }

    const { data, path }: Props = $props();

    function isAllowed([key, value]: [string, unknown]): boolean {
        return value !== null && value !== undefined && isDetailKey(key);
    }
</script>

<div
    class="
        space-y-1 border-l-2 border-gray-200 pl-4
        dark:border-gray-700
    ">
    {#each Object.entries(data).filter(isAllowed) as [key, value]}
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
                    {BSL_NAMES[path ? `${path}.${key}` : key] || key}:
                </span>
                <Self data={value} path={path ? `${path}.${key}` : key} />
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
                        {BSL_NAMES[path ? `${path}.${key}` : key] || key}
                    </span>
                    <span
                        class="
                            font-mono tracking-tighter text-nowrap text-gray-900
                            dark:text-gray-100
                        ">
                        {formatValue(value)}&thinsp;{key.split("_").pop()}
                    </span>
                </div>
            {/if}
        </div>
    {/each}
</div>
