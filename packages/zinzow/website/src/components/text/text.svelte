<script lang="ts">
    import classNames from "classnames";
    import { twMerge } from "tailwind-merge";

    export let tag: keyof HTMLElementTagNameMap;

    let className = "";
    export { className as class };

    export let isLight = false;
    export let hasHover = false;
</script>

<svelte:element
    this={tag}
    class={twMerge(
        classNames(
            {
                "text-gray-900 dark:text-white": !isLight && !hasHover,
            },
            className,
        ),
    )}>
    <slot />
</svelte:element>
