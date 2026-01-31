<script lang="ts">
    import type { PageData } from "./$types";
    import { page } from "$app/state";
    import { clsx } from "clsx";
    import { H1 } from "../components/heading";
    import { colorPrimaryClass, stylesMap } from "../lib/common/styles";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { currentRoute } = $derived(data);

    const status = page.status;
    const error = page.error as Error & Record<string, string>;
</script>

<div
    class={clsx(
        `
            px-6 py-24 text-center
            lg:px-8
        `,
        currentRoute?.isHero && "mt-48",
    )}>
    <p class={clsx(colorPrimaryClass, "text-base font-semibold")}>
        {status}
    </p>
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
        <a href="/" class={stylesMap.button}>
            {error.buttonText || "Zur Startseite"}
        </a>
    </div>
</div>
