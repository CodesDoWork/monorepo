<script lang="ts">
    import { clsx } from "clsx";
    import { stylesMap } from "../../lib/common/styles";

    interface Props {
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
    }: Props = $props();
</script>

<textarea
    {required}
    {name}
    {id}
    {rows}
    aria-describedby={ariaDescribedBy}
    class={clsx(
        className,
        stylesMap.input,
        errors?.length &&
            `
                outline-error-light!
                dark:outline-error-dark!
            `,
    )}>{value}</textarea>
