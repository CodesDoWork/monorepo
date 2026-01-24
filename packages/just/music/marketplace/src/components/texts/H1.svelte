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
            mt-3 mb-4 w-full text-center text-2xl font-bold
            sm:text-3xl
            md:my-16 md:text-4xl
        `,
        className,
    )}>
    {@render children?.()}
</h1>
