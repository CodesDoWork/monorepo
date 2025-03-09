<script lang="ts">
    import Icon from "@iconify/svelte";
    import classNames from "classnames";
    import { Text } from ".";
    import { smoothScrollOnClick } from "../../utils/smoothScrollOnClick";

    let className = "";
    export { className as class };
    export let iconContainerClass = "";
    export let icon: string;
    export let href: string | null = null;

    const hrefClass = {
        "group-hover:text-gray-900 dark:group-hover:text-white transition-colors": href,
    };
</script>

<svelte:element
    this={href ? "a" : "div"}
    {href}
    on:click={smoothScrollOnClick}
    role={href ? "link" : "none"}
    class={classNames(className, "group flex w-fit gap-2")}>
    <dt class={iconContainerClass}>
        <Icon {icon} class={classNames(hrefClass, "size-6 text-gray-400")} />
    </dt>
    <Text tag="dd" class={classNames(hrefClass)}>
        <slot />
    </Text>
</svelte:element>
