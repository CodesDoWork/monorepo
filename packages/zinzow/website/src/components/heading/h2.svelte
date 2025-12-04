<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";
    import Heading from "./heading.svelte";

    interface Props {
        class?: string;
        children?: Snippet;
    }

    const { class: className = "", children }: Props = $props();
</script>

<Heading
    tag="h2"
    class={clsx(
        `
            mb-6 text-2xl
            sm:text-3xl
            md:text-4xl
        `,
        className,
    )}>
    {@render children?.()}
</Heading>
