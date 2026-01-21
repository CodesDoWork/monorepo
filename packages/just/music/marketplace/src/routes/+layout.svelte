<script lang="ts">
    import type { Snippet } from "svelte";
    import "@cdw/monorepo/just-branding/assets/css/tailwind.css";

    interface Props {
        children?: Snippet;
    }

    const { children }: Props = $props();
</script>

<div
    class="
        from-primary-400 to-secondary-400
        dark:from-primary-950 dark:to-secondary-950
        relative min-h-screen overflow-x-hidden bg-linear-to-b from-5% to-95% text-gray-800
        transition-colors
        dark:text-gray-200
    ">
    <main class="mx-auto max-w-7xl">
        {@render children?.()}
    </main>
</div>
