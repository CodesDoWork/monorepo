<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";
    import { smoothScrollTo } from "../shared/smoothScroll";

    interface Props {
        class?: string;
        href: string;
        title: string;
        button?: boolean;
        noStyle?: boolean;
        smoothScroll?: boolean;
        children?: Snippet;
        isMe?: boolean;
        onclick?: (event: MouseEvent) => void;
    }

    const {
        class: className = "",
        href,
        title,
        button = false,
        noStyle = false,
        smoothScroll = false,
        children,
        onclick,
        isMe,
    }: Props = $props();

    type ClickEvent = MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement };

    const handleClick = (event: ClickEvent) => {
        if (smoothScroll) {
            event.preventDefault();
            smoothScrollTo(event.currentTarget.getAttribute("href"));
            history.pushState(null, "", event.currentTarget.getAttribute("href"));
        }

        onclick?.(event);
    };

    const aClass = $derived(
        clsx(
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
                    "p-1 text-[var(--page-color)] hover:bg-[var(--page-color)] hover:text-white dark:text-[var(--page-color)] dark:hover:bg-[var(--page-color)] dark:hover:text-black",
                ],
            className,
        ),
    );

    const external = href.startsWith("http");
    let rel = external ? "noopener" : undefined;
    if (isMe) {
        rel = rel ? `me ${rel}` : "me";
    }
</script>

<svelte:element
    this={href ? "a" : "span"}
    class={aClass}
    {href}
    onclick={handleClick}
    {rel}
    target={external ? "_blank" : undefined}
    role={href ? "link" : "none"}
    {title}>
    {@render children?.()}
</svelte:element>
