<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        title: string;
        actions?: Snippet;
        content?: Snippet;
    }

    const { title, actions, content }: Props = $props();
</script>

<header
    class="
        z-20 border-b border-gray-200 bg-white shadow-sm
        dark:border-gray-800 dark:bg-gray-900
    ">
    <div class="mx-auto max-w-7xl p-4">
        <h1
            class="
                text-primary-700
                dark:text-primary-400
                mb-4 text-2xl font-bold
            ">
            {title}
        </h1>

        <div
            class="
                flex flex-col items-start gap-4
                md:flex-row md:items-center
            ">
            {@render actions?.()}
        </div>

        {@render content?.()}
    </div>
</header>
