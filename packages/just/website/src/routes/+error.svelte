<script lang="ts">
    import { page } from "$app/state";
    import Link from "../components/Link.svelte";

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
</script>

<div class="flex flex-col items-center">
    <p class="mb-16 font-mono text-3xl md:text-4xl lg:text-5xl">{page.error.message}</p>
    <span class="mb-24 text-7xl md:text-8xl lg:text-9xl">{emojis[page.status] ?? ""}</span>
    <Link title="Back Home" button href="/">Back Home</Link>
</div>
