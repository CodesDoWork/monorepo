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
    tag="h4"
    class={clsx(
        `
            md:text-md
            text-base
            lg:text-lg/8
        `,
        className,
    )}>
    {@render children?.()}
</Heading>
