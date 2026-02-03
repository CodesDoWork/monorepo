<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";

    interface Props {
        class?: string;
        items: { name: string; isSelected: boolean }[];
        header?: Snippet;
        translations?: Record<string, string>;
    }

    const { class: className, items, header, translations }: Props = $props();
</script>

<div
    class={clsx(
        className,
        `
            mt-4 grid grid-cols-1 gap-2 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50
            p-4
            sm:grid-cols-2
            md:grid-cols-3
            dark:border-gray-700 dark:bg-gray-800
        `,
    )}>
    {#if header}
        <div
            class="
                col-span-full mb-2 border-b pb-2 text-sm text-gray-500
                dark:border-gray-700 dark:text-gray-400
            ">
            {@render header()}
        </div>
    {/if}
    {#each items as item}
        <label
            class="
                flex cursor-pointer items-center space-x-2 rounded-sm p-1 text-xs
                hover:bg-gray-100
                dark:hover:bg-gray-700
            ">
            <input
                type="checkbox"
                bind:checked={item.isSelected}
                class="
                    text-primary-600
                    focus:ring-primary-500
                    rounded-sm
                " />
            <span
                class="
                    truncate text-gray-700
                    dark:text-gray-300
                "
                title={item.name}>
                {translations ? translations[item.name] || item.name : item.name}
            </span>
        </label>
    {/each}
</div>
