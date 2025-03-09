<script lang="ts">
    import Icon from "@iconify/svelte";
    import classNames from "classnames";
    import { Text } from ".";

    let className = "";
    export { className as class };
    export let iconContainerClass = "";
    export let icon: string;
    export let href: string | null = null;

    const hrefClass = {
        "group-hover:text-gray-900 dark:group-hover:text-white transition-colors": href,
    };

    type ClickEvent = MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement };
    const smoothScrollOnClick = (event: ClickEvent) => {
        event.preventDefault();
        const el = document.querySelector(event.currentTarget.getAttribute("href"));
        el && el.scrollIntoView({ behavior: "smooth" });
    };
</script>

<svelte:element
    this={href ? "a" : "div"}
    {href}
    on:click={href.startsWith("#") ? smoothScrollOnClick : undefined}
    class={classNames(className, "group flex w-fit gap-2")}>
    <dt class={iconContainerClass}>
        <Icon {icon} class={classNames(hrefClass, "size-6 text-gray-400")} />
    </dt>
    <Text tag="dd" class={classNames(hrefClass)}>
        <slot />
    </Text>
</svelte:element>
