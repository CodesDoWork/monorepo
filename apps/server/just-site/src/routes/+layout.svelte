<script lang="ts">
    import type { PageData } from "./$types";
    import "../../../../../libs/branding/assets/css/tailwind.css";

    export let data: PageData;
    const { siteInfo } = data;
</script>

<svelte:head>
    <meta content={siteInfo.keywords.join(" ")} name="keywords" />
    <meta content="website" property="og:type" />
    <meta content="https://justinkonratt.com" property="og:url">
    <meta content="summary" name="twitter:card">
    <!-- <meta content="<needed>" property="og:image"> -->
    <!-- <meta content="Alt text for image" name="twitter:image:alt"> -->
</svelte:head>

<div class="overflow-x-hidden relative bg-gradient-to-b from-primary-400 from-5% to-secondary-400 to-95% dark:from-primary-950 dark:to-secondary-950 transition-colors">
    <slot />
</div>
