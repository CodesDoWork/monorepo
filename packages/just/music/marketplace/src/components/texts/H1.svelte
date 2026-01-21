<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";

    interface Props {
        children?: Snippet;
        class?: string;
    }

    const { children, class: className }: Props = $props();
</script>

<h1
    class={clsx(
        `
            text-primary-950
            dark:text-primary-500
            my-16 text-center text-4xl font-bold
        `,
        className,
    )}>
    {@render children?.()}
</h1>
