<script lang="ts">
    import type { DOMAttributes, HTMLInputAttributes } from "svelte/elements";
    import { clsx } from "clsx";
    import { inputClass } from "./styles";

    interface Props extends HTMLInputAttributes, DOMAttributes<HTMLInputElement> {
        errors?: string[];
        class?: string;
        input?: HTMLInputElement;
    }

    let {
        errors,
        class: className,
        input = $bindable(),
        value = $bindable(),
        ...props
    }: Props = $props();
</script>

<input
    bind:this={input}
    bind:value
    {...props}
    class={clsx(
        className,
        inputClass,
        errors?.length &&
            `
                outline-error-light!
                dark:outline-error-dark!
            `,
    )} />
