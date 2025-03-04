<script lang="ts">
    import { page } from "$app/stores";
    import { H1 } from "../components/heading";

    const status = $page.status;
    const error = $page.error as Error & Record<string, string>;
</script>

<div class="px-6 py-24 text-center sm:py-32 lg:px-8">
    <p class="text-primary-600 dark:text-primary-400 text-base font-semibold">{status}</p>
    <H1 class="mt-4 text-5xl sm:text-7xl">{error.title || "Fehler"}</H1>
    <p class="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
        {error.message || "Etwas ist schief gelaufen."}
    </p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
        <a
            href="/"
            class="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
            {error.buttonText || "Zur Startseite"}
        </a>
    </div>
</div>
