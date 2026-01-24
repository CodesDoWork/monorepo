<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import { clsx } from "clsx";

    interface Props extends HTMLAttributes<HTMLHeadingElement> {}

    const { class: className, children, ...rest }: Props = $props();
</script>

<h1
    class={clsx(
        className,
        `
            text-primary-950
            dark:text-primary
            my-4 text-center text-xl font-bold
            sm:my-5 sm:text-2xl
            md:my-6 md:text-3xl
            lg:my-8 lg:text-4xl
        `,
    )}
    {...rest}>
    {@render children?.()}
</h1>
