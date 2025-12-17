<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";

    interface Props {
        class?: string;
        children?: Snippet;
        block?: boolean;
    }

    const { class: className = "", children }: Props = $props();
</script>

<p
    class={clsx(
        `
            text-sm/6 text-gray-600
            dark:text-gray-400
        `,
        className,
    )}>
    {@render children?.()}
</p>
