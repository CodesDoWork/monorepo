<script lang="ts">
    import type { ChangeEventHandler, FullAutoFill, HTMLInputTypeAttribute } from "svelte/elements";
    import { clsx } from "clsx";
    import { stylesMap } from "../../lib/common/styles";

    interface Props {
        required?: boolean;
        type?: HTMLInputTypeAttribute;
        name?: string;
        id?: string;
        autocomplete?: FullAutoFill;
        multiple?: boolean;
        value?: string;
        errors?: string[];
        class?: string;
        input?: HTMLInputElement;
        onchange?: ChangeEventHandler<HTMLInputElement>;
        "aria-describedby"?: string;
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
