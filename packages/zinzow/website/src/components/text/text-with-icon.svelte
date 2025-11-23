<script lang="ts">
    import type { Snippet } from "svelte";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { Text } from ".";
    import { smoothScrollOnClick } from "../../utils/smoothScrollOnClick";

    interface Props {
        class?: string;
        iconContainerClass?: string;
        icon: string;
        href?: string | null;
        children?: Snippet;
    }

    const {
        class: className = "",
        iconContainerClass = "",
        icon,
        href = null,
        children,
    }: Props = $props();

    const hrefClass = {
        "group-hover:text-gray-900 dark:group-hover:text-white transition-colors": href,
    };
</script>

<svelte:element
    this={href ? "a" : "div"}
    {href}
    onclick={smoothScrollOnClick}
    role={href ? "link" : "none"}
    class={clsx(className, "group flex w-fit gap-2")}>
    <dt class={iconContainerClass}>
        <Icon {icon} class={clsx(hrefClass, "size-6 text-gray-400")} />
    </dt>
    <Text tag="dd" class={clsx(hrefClass)}>
        {@render children?.()}
    </Text>
</svelte:element>
