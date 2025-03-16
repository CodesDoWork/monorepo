<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";

    interface Props {
        class?: string;
        href: string;
        title: string;
        button?: boolean;
        noStyle?: boolean;
        smoothScroll?: boolean;
        children?: Snippet;
    }

    const {
        class: className = "",
        href,
        title,
        button = false,
        noStyle = false,
        smoothScroll = false,
        children,
    }: Props = $props();

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

    const aClass = $derived(clsx(
        "cursor-pointer rounded-md font-mono transition",
        button && [
            "p-3 dark:text-white",
            "bg-white dark:bg-opacity-10",
            "hover:bg-accent-500 dark:hover:bg-secondary-500/50 hover:rotate-3",
            "shadow-md hover:shadow-lg",
            "origin-top-left",
        ],
        !button &&
            !noStyle && [
                "text-accent-700 dark:text-accent-500 hover:bg-accent-700 dark:hover:bg-accent-500 p-1 hover:text-white dark:hover:text-black",
            ],
        className,
    ));

    const external = href.startsWith("http");
</script>

<svelte:element
    this={href ? "a" : "span"}
    class={aClass}
    {href}
    onclick={handleClick}
    rel={external ? "noopener" : undefined}
    target={external ? "_blank" : undefined}
    role={href ? "link" : "none"}
    {title}>
    {@render children?.()}
</svelte:element>
