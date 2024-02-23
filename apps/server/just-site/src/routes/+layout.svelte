<script lang="ts">
    import "../../../../../libs/branding/assets/css/tailwind.css";
    import DarkmodeToggle from "../components/DarkmodeToggle.svelte";
</script>

<svelte:head>
    <title>Hello Svelte</title>
    <meta content="#0000ff" name="color-scheme" />
</svelte:head>

<main class="min-h-screen bg-gradient-to-b from-primary-500 from-5% to-secondary-500 to-95% pt-4 pb-16 dark:from-primary-950 dark:to-secondary-950 transition-colors">
    <header class="text-end mb-12 mr-8">
        <DarkmodeToggle />
    </header>
    <slot />
</main>
