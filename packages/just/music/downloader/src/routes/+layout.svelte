<script lang="ts">
    import type { Snippet } from "svelte";
    import "@cdw/monorepo/just-branding/assets/css/tailwind.css";

    interface Props {
        children?: Snippet;
    }

    const { children }: Props = $props();
</script>

<main
    class="from-primary-400 to-secondary-400 dark:from-primary-950 dark:to-secondary-950 relative min-h-screen overflow-x-hidden bg-gradient-to-b from-5% to-95% transition-colors">
    {@render children?.()}
</main>
