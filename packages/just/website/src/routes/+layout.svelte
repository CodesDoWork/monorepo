<script lang="ts">
    import type { Snippet } from "svelte";
    import type { PageData } from "./$types";
    import "@cdw/monorepo/just-branding/assets/css/tailwind.css";

    interface Props {
        data: PageData;
        children?: Snippet;
    }

    const { data, children }: Props = $props();
    const { siteInfo } = data;
</script>

<svelte:head>
    <meta content={siteInfo.keywords.join(" ")} name="keywords" />
    <meta content="website" property="og:type" />
    <meta content="https://justinkonratt.com" property="og:url" />
    <meta content="summary" name="twitter:card" />
    <!-- <meta content="<needed>" property="og:image"> -->
    <!-- <meta content="Alt text for image" name="twitter:image:alt"> -->
</svelte:head>

<div
    class="from-primary-400 to-secondary-400 dark:from-primary-950 dark:to-secondary-950 relative overflow-x-hidden bg-gradient-to-b from-5% to-95% transition-colors">
    {@render children?.()}
</div>
