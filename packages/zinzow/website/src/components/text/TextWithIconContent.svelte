<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";
    import { aHoverAnimation, textBaseColorClasses } from "../../lib/common/styles";

    interface Props {
        class?: string;
        icon: string;
        href: string | null;
        small?: boolean;
        children?: Snippet;
    }

    const { class: className, href, icon, small, children }: Props = $props();

    const hrefClass = $derived(
        clsx(
            href &&
                `
                    group-hover:text-gray-950
                    dark:group-hover:text-gray-50
                `,
            href && aHoverAnimation,
        ),
    );
</script>

<dt class={className}>
    <span class={clsx(icon, hrefClass, small ? "size-4" : "size-6", "text-gray-400")}></span>
</dt>
<dd
    class={clsx(
        textBaseColorClasses,
        hrefClass,
        small &&
            `
                text-sm!
                md:text-base!
            `,
    )}>
    {@render children?.()}
</dd>
