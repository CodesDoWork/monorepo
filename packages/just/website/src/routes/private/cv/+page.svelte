<script lang="ts">
    import { clsx } from "clsx";
</script>

<div class="min-w-screen min-h-screen flex justify-center items-center">
    <div
        class={clsx(
            "w-a4 h-a4 p-a4-page-padding shadow-a4 box-border",
            "from-primary-400 to-secondary-400 dark:from-primary-950 dark:to-secondary-950",
            "bg-gradient-to-b from-5% to-95% transition-colors",
        )}>
        My CV
    </div>
</div>

<svelte:head>
    <style>
        @page {
            size: A4;
            margin: 0;
        }
        body {
            margin: 0;
        }
    </style>
</svelte:head>
