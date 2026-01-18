<script lang="ts">
    import { page } from "$app/state";

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

<div class="flex h-screen flex-col items-center justify-center">
    <p
        class="
            mb-16 font-mono text-3xl
            md:text-4xl
            lg:text-5xl
        ">
        {page.error?.message || "Something went wrong"}
    </p>
    <span
        class="
            mb-24 text-7xl
            md:text-8xl
            lg:text-9xl
        ">{emojis[page.status] ?? ""}</span>
</div>
