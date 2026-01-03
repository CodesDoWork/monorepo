<script lang="ts">
    import type { Snippet } from "svelte";
    import { smoothScrollOnClick } from "@cdw/monorepo/shared-utils/html/client";
    import { clsx } from "clsx";

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
            smoothScrollOnClick(event);
        }

        onclick?.(event);
    };

    const aClass = $derived(
        clsx(
            "cursor-pointer rounded-md font-mono transition",
            button &&
                `
                    hover:bg-accent-500 hover:rotate-3 hover:shadow-lg
                    dark:hover:bg-secondary-500/50
                    origin-top-left bg-white p-3 shadow-md
                    dark:bg-white/10 dark:text-white
                `,
            !button &&
                !noStyle &&
                `
                    text-pageColor p-1
                    hover:bg-pageColor hover:text-white
                    dark:text-pageColor dark:hover:bg-pageColor dark:hover:text-black
                `,
            className,
        ),
    );

    const external = $derived(href.startsWith("http"));
    const rel = $derived.by(() => {
        let tmpRel = external ? "noopener" : undefined;
        if (isMe) {
            tmpRel = tmpRel ? `me ${tmpRel}` : "me";
        }

        return tmpRel;
    });
</script>

{#if href}
    <a
        data-sveltekit-noscroll
        class={aClass}
        {href}
        onclick={handleClick}
        {rel}
        target={external ? "_blank" : undefined}
        {title}>
        {@render children?.()}
    </a>
{:else}
    <span class={aClass}>
        {@render children?.()}
    </span>
{/if}
