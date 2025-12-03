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
            relative mx-auto max-w-7xl p-6
            lg:px-8
        `,
        className,
    )}>
    {@render children?.()}
</div>
