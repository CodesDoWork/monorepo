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
    tag="h3"
    class={clsx(
        `
            text-xl
            sm:text-2xl
            md:text-3xl
        `,
        className,
    )}>
    {@render children?.()}
</Heading>
