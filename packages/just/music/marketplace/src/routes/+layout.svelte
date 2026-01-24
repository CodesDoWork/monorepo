<script lang="ts">
    import type { Snippet } from "svelte";
    import { Layout } from "@cdw/monorepo/just-shared-svelte-components";
    import "@cdw/monorepo/just-branding/assets/css/tailwind.css";

    interface Props {
        children?: Snippet;
    }

    const { children }: Props = $props();
</script>

<Layout>
    <main class="mx-auto flex min-h-screen max-w-7xl flex-col">
        {@render children?.()}
    </main>
</Layout>
