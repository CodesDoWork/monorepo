<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";

    interface Props {
        class?: string;
        children?: Snippet;
    }

    const { class: className = "", children }: Props = $props();
</script>

<li
    class={clsx(
        className,
        `
            bg-primary
            dark:bg-primary-400
            rounded-md px-2 py-1 text-white shadow-sm
        `,
    )}>
    {@render children?.()}
</li>
