<script lang="ts">
    import { clsx } from "clsx";
    import { stylesMap } from "../../lib/common/styles";

    interface Props {
        required?: boolean;
        name?: string;
        id?: string;
        class?: string;
        rows?: number;
        "aria-describedby"?: string;
    }

    const {
        required,
        name,
        id,
        rows,
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
    class={clsx(className, stylesMap.input)}>
</textarea>
