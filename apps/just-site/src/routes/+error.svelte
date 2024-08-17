<script lang="ts">
    import type { PageData } from "./$types";
    import { page } from "$app/stores";
    import Link from "../components/Link.svelte";
    import Page from "../components/Page.svelte";

    const emojis: Record<number, string> = {
        400: "❗",
        401: "🔒",
        403: "🚫",
        404: "🔍",
        500: "💥",
        501: "🚧",
        502: "💤",
        503: "🛑",
        504: "⌛",
    };

    export let data: PageData;
    const { siteInfo, routes } = data;
</script>

<Page routes={routes}
      siteInfo={siteInfo}
      title={{title: $page.status.toString()}}>
    <div class="flex flex-col items-center">
        <p class="text-3xl md:text-4xl lg:text-5xl mb-16 font-mono">{$page.error?.message}</p>
        <span class="text-7xl md:text-8xl lg:text-9xl mb-24">{emojis[$page.status] || ""}</span>
        <Link title="Back Home" button href="/">Back Home</Link>
    </div>
</Page>
