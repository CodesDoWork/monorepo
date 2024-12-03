<script lang="ts">
    import { page } from "$app/stores";
    import { getErrorKey, getTranslationKey } from "../utils/translations";

    const status = $page.status;
    const error = $page.error as Error & Record<string, string>;
    const title = error[getErrorKey(status, "title")] || "Fehler";
    const message = error[getErrorKey(status, "message")] || "Etwas ist schief gelaufen.";
    const buttonText = error[getTranslationKey("button", "backHome")] || "Zur Startseite";
</script>

<div class="px-6 py-24 text-center sm:py-32 lg:px-8">
    <p class="text-primary-600 dark:text-primary-400 text-base font-semibold">{status}</p>
    <h1
        class="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
        {title}
    </h1>
    <p class="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
        {message}
    </p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
        <a
            href="/"
            class="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >{buttonText}</a>
    </div>
</div>
