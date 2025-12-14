<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";

    interface Props {
        class?: string;
        children?: Snippet;
    }

    const { class: className = "", children }: Props = $props();
</script>

<div
    class={clsx(
        `
            relative mx-auto max-w-screen p-6
            md:max-w-7xl
            lg:px-8
        `,
        className,
    )}>
    {@render children?.()}
</div>
