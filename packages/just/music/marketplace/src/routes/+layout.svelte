<script lang="ts">
    import type { Snippet } from "svelte";
    import { Layout } from "@cdw/monorepo/just-shared-svelte-components";
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

<Layout>
    <main class="mx-auto flex min-h-screen max-w-7xl flex-col">
        {@render children?.()}
    </main>
</Layout>
