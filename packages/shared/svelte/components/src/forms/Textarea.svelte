<script lang="ts">
    import type { HTMLTextareaAttributes } from "svelte/elements";
    import { clsx } from "clsx";
    import { inputClass } from "./styles";

    interface Props extends HTMLTextareaAttributes {
        required?: boolean;
        name?: string;
        id?: string;
        class?: string;
        rows?: number;
        value?: string;
        errors?: string[];
        "aria-describedby"?: string;
    }

    const {
        required,
        name,
        id,
        rows,
        value,
        errors,
        class: className,
        "aria-describedby": ariaDescribedBy,
        ...rest
    }: Props = $props();
</script>

<textarea
    {...rest}
    {required}
    {name}
    {id}
    {rows}
    aria-describedby={ariaDescribedBy}
    class={clsx(
        className,
        inputClass,
        errors?.length &&
            `
                outline-red-600!
                dark:outline-red-800!
            `,
    )}>{value}</textarea>
