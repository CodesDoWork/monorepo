<script lang="ts">
    import type { DOMAttributes, HTMLInputAttributes } from "svelte/elements";
    import { clsx } from "clsx";
    import { stylesMap } from "../../lib/common/styles";

    interface Props extends HTMLInputAttributes, DOMAttributes<HTMLInputElement> {
        errors?: string[];
        class?: string;
        input?: HTMLInputElement;
    }

    let { errors, class: className, input = $bindable(), ...props }: Props = $props();
</script>

<input
    bind:this={input}
    {...props}
    class={clsx(
        className,
        stylesMap.input,
        errors?.length &&
            `
                outline-error-light!
                dark:outline-error-dark!
            `,
    )} />
