<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
        action?: {
            text: string;
            onclick: (event: MouseEvent) => void;
        };
    }

    const { children, action }: Props = $props();
</script>

<div class="mb-4">
    <div
        class="
            dark:hover:border-primary-900
            flex flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4
            shadow-sm transition-shadow
            hover:shadow-md
            md:flex-row md:items-center
            dark:border-gray-800 dark:bg-gray-900
        ">
        <div class="flex grow items-start gap-4">
            {@render children()}
        </div>

        {#if action}
            <button
                onclick={action.onclick}
                class="
                    bg-primary-50 text-primary-600
                    hover:bg-primary-100
                    dark:bg-primary-900/20 dark:text-primary-400
                    dark:hover:bg-primary-900/40
                    w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors
                    md:w-auto
                ">
                {action.text}
            </button>
        {/if}
    </div>
</div>
