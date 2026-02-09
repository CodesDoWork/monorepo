<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";
    import { clsx } from "clsx";

    interface Props extends HTMLInputAttributes {}

    let { value = $bindable(), class: className, type = "text", ...rest }: Props = $props();
</script>

<div class="relative w-full grow">
    <input
        {type}
        bind:value
        {...rest}
        class={clsx(
            className,
            `
                focus:ring-primary-500
                w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-gray-900
                focus:ring-2 focus:outline-none
                dark:border-gray-700 dark:bg-gray-800 dark:text-white
            `,
        )} />
    <svg
        class="absolute top-2.5 left-3 size-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
</div>
