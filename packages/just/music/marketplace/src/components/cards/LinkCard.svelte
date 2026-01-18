<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";
    import Card from "./Card.svelte";

    interface Props {
        class?: string;
        href: string;
        children?: Snippet;
    }

    const { class: className, href, children }: Props = $props();
    const isExternal = $derived(/^https?:\/\/.+$/.test(href));
</script>

<Card>
    <a
        class={clsx("block px-6 py-4 text-center text-lg", className)}
        {href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}>
        {@render children?.()}
    </a>
</Card>
