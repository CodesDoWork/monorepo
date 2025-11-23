<script lang="ts">
    import { page } from "$app/stores";
    import { H1 } from "../components/heading";

    const status = $page.status;
    const error = $page.error as Error & Record<string, string>;
</script>

<div
    class="
        px-6 py-24 text-center
        sm:py-32
        lg:px-8
    ">
    <p class="text-base font-semibold text-(--primary)">{status}</p>
    <H1
        class="
            mt-4 text-5xl
            sm:text-7xl
        ">{error.title || "Fehler"}</H1>
    <p
        class="
            mt-6 text-lg font-medium text-pretty text-gray-500
            sm:text-xl/8
        ">
        {error.message || "Etwas ist schief gelaufen."}
    </p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
        <a
            href="/"
            class="
              rounded-md bg-(--primary) px-3.5 py-2.5 text-sm font-semibold
              text-white shadow-sm
              hover:bg-(--primary-400)
              focus-visible:outline focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-(--primary)
              dark:hover:bg-(--primary-600)
            ">
            {error.buttonText || "Zur Startseite"}
        </a>
    </div>
</div>
