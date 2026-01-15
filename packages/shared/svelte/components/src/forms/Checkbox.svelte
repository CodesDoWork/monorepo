<script lang="ts">
    import type { DOMAttributes, HTMLInputAttributes } from "svelte/elements";
    import { clsx } from "clsx";

    interface Props extends HTMLInputAttributes, DOMAttributes<HTMLInputElement> {
        id?: string;
        name?: string;
        checked?: boolean;
        required?: boolean;
        errors?: string[];
        "aria-describedby"?: string;
        class?: string;
        boxClass?: string;
        svgClass?: string;
        input?: HTMLInputElement;
    }

    let {
        id,
        name,
        checked = $bindable(),
        required,
        errors,
        "aria-describedby": ariaDescribedBy,
        class: className,
        boxClass,
        svgClass,
        input = $bindable(),
        ...props
    }: Props = $props();
</script>

<div class={clsx(boxClass, "group grid size-4 min-w-4 grid-cols-1")}>
    <input
        {...props}
        type="checkbox"
        {id}
        {name}
        bind:checked
        bind:this={input}
        {required}
        aria-describedby={ariaDescribedBy}
        class={clsx(
            className,
            errors?.length &&
                `
                    border-error-light!
                    dark:border-error-dark!
                `,
            `
                checked:border-primary-600 checked:bg-primary-600
                indeterminate:border-primary-600 indeterminate:bg-primary-600
                focus-visible:outline-primary-600 focus-visible:outline-2
                focus-visible:outline-offset-2
                dark:checked:border-primary dark:checked:bg-primary
                dark:indeterminate:border-primary dark:indeterminate:bg-primary
                dark:focus-visible:outline-primary
                col-start-1 row-start-1 cursor-pointer appearance-none rounded-sm border
                border-gray-300 bg-white
                disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100
                dark:border-white/10 dark:bg-white/5 dark:disabled:border-white/5
                dark:disabled:bg-white/10 dark:disabled:checked:bg-white/10
                forced-colors:appearance-auto
            `,
        )} />
    <svg
        viewBox="0 0 14 14"
        fill="none"
        class={clsx(
            svgClass,
            `
                pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center
                stroke-white
                group-has-disabled:stroke-gray-950/25
                dark:group-has-disabled:stroke-white/25
            `,
        )}>
        <path
            d="M3 8L6 11L11 3.5"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="
                opacity-0
                group-has-checked:opacity-100
            " />
        <path
            d="M3 7H11"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="
                opacity-0
                group-has-indeterminate:opacity-100
            " />
    </svg>
</div>
