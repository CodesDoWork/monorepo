<script lang="ts">
    import { page } from "$app/stores";

    const emojis = {
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

<div>
    <h1>{$page.status.toString()}</h1>
    <p class="text-3xl md:text-4xl lg:text-5xl mb-16 font-mono">{$page.error.message}</p>
    <span class="text-7xl md:text-8xl lg:text-9xl mb-24">{emojis[$page.status] || ""}</span>
</div>
