<script lang="ts">
    import type { Snippet } from "svelte";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { textBaseColorClasses } from "../../lib/common/typography";

    interface Props {
        class?: string;
        icon: string;
        href: string | null;
        children?: Snippet;
    }

    const { class: className, href, icon, children }: Props = $props();

    const hrefClass = $derived(
        clsx({
            "transition-colors group-hover:text-gray-950 dark:group-hover:text-white": href,
        }),
    );
</script>

<dt class={className}>
    <Icon {icon} class={clsx(hrefClass, "size-6 text-gray-400")} />
</dt>
<dd class={clsx(textBaseColorClasses, hrefClass)}>
    {@render children?.()}
</dd>
