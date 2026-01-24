<script lang="ts">
    import type { Snippet } from "svelte";
    import "@cdw/monorepo/just-branding/assets/css/tailwind.css";

    interface Props {
        children?: Snippet;
    }

    const { children }: Props = $props();

    $effect(() => {
        document.body.classList.add("bg-primary-400", "dark:bg-primary-950");
    });
</script>

<svelte:head>
    <meta
        name="theme-color"
        content="oklch(74.6% 0.16 232.661)"
        media="(prefers-color-scheme: light)" />
    <meta
        name="theme-color"
        content="oklch(29.3% 0.066 243.157)"
        media="(prefers-color-scheme: dark)" />
</svelte:head>

<div
    class="
        from-primary-400 to-secondary-400
        dark:from-primary-950 dark:to-secondary-950
        relative min-h-screen bg-linear-to-b from-5% to-95% px-4 text-gray-800 transition-colors
        dark:text-gray-200
    ">
    <main class="mx-auto max-w-7xl">
        {@render children?.()}
    </main>
</div>
