<script lang="ts">
    import { clsx } from "clsx";

    let className = "";
    export { className as class };
    export let href: string;
    export let title: string;
    export let button = false;
    export let noStyle = false;
    export let smoothScroll = false;

    type ClickEvent = MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement };

    const scrollTo = ({ currentTarget }: ClickEvent) => {
        const el = document.querySelector(currentTarget.getAttribute("href"));
        el && el.scrollIntoView({ behavior: "smooth" });
    };

    const handleClick = (event: ClickEvent) => {
        if (smoothScroll) {
            event.preventDefault();
            scrollTo(event);
        }
    };

    $: aClass = clsx(
        "font-mono transition rounded-md cursor-pointer",
        button && [
            "dark:text-white p-3",
            "bg-white dark:bg-opacity-10",
            "hover:bg-accent-500 dark:hover:bg-opacity-50 dark:hover:bg-secondary-500 hover:rotate-3",
            "shadow-md hover:shadow-lg",
            "origin-top-left",
        ],
        !button && !noStyle && [
            "p-1 hover:text-white dark:hover:text-black text-accent-700 dark:text-accent-500 hover:bg-accent-700 dark:hover:bg-accent-500",
        ],
        className,
    );

    const external = href.startsWith("http");
</script>

<svelte:element
    this={href ? "a" : "span"}
    class={aClass}
    {href}
    on:click={handleClick}
    rel={external ? "noopener" : undefined}
    target={external ? "_blank" : undefined}
    role={href ? "link" : "none"}
    {title}>
    <slot />
</svelte:element>
