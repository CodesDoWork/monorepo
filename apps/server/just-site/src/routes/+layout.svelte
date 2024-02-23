<script lang="ts">
    import "../../../../../libs/branding/assets/css/tailwind.css";
</script>

<svelte:head>
    <title>Hello Svelte</title>
    <meta content="#0000ff" name="color-scheme" />
</svelte:head>

<div class="bg-gradient-to-b from-primary-500 from-5% to-secondary-500 to-95% dark:from-primary-950 dark:to-secondary-950 min-h-screen transition-colors">
    <slot />
</div>
