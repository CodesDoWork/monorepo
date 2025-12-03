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
    tag="h1"
    class={clsx(
        `
            mb-6 text-3xl
            sm:text-4xl
            md:text-5xl
        `,
        className,
    )}>
    {@render children?.()}
</Heading>
