<script lang="ts">
    import type { BSLItem } from "../../lib/client/bsl-item";
    import DataTree from "./DataTree.svelte";

    interface Props {
        selectedItem: BSLItem | null;
        toggleCompareItem: (code: string) => void;
        isInCompare: boolean;
    }

    let { selectedItem = $bindable(), isInCompare, toggleCompareItem }: Props = $props();
</script>

{#if selectedItem}
    <dialog
        open
        class="
            fixed inset-0 z-50 flex size-full items-center justify-center bg-black/50 p-4
            backdrop-blur-sm
        "
        onclick={() => (selectedItem = null)}
        aria-modal="true">
        <div
            class="
                animate-in zoom-in-95 flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden
                rounded-2xl bg-white shadow-2xl duration-200
                dark:bg-gray-900
            "
            role="none"
            onclick={e => e.stopPropagation()}>
            <div
                class="
                    flex items-start justify-between border-b border-gray-100 bg-gray-50 p-6
                    dark:border-gray-800 dark:bg-gray-800/50
                ">
                <div>
                    <h2
                        class="
                            text-2xl font-bold text-gray-900
                            dark:text-white
                        ">
                        {selectedItem.description}
                    </h2>
                </div>
                <button
                    title="Close"
                    onclick={() => (selectedItem = null)}
                    class="
                        rounded-full border bg-white p-1 text-gray-400 shadow-sm
                        hover:text-gray-600
                        dark:border-gray-700 dark:bg-gray-800
                        dark:hover:text-gray-200
                    ">
                    <svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <div class="flex-1 overflow-y-auto p-6">
                <DataTree data={selectedItem} />
            </div>

            <div
                class="
                    flex justify-end gap-2 border-t border-gray-100 bg-gray-50 p-4
                    dark:border-gray-800 dark:bg-gray-900
                ">
                <button
                    onclick={() => {
                        if (selectedItem?.code) {
                            toggleCompareItem(selectedItem.code);
                        }
                    }}
                    class="
                        rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium
                        transition-colors
                        hover:bg-white
                        dark:border-gray-600 dark:text-gray-200
                        dark:hover:bg-gray-800
                    ">
                    {isInCompare ? "Remove from Compare" : "Add to Compare"}
                </button>
                <button
                    onclick={() => (selectedItem = null)}
                    class="
                        bg-primary-600
                        hover:bg-primary-700
                        rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors
                    ">
                    Close
                </button>
            </div>
        </div>
    </dialog>
{/if}
