<script lang="ts">
    import type { FullAutoFill, HTMLInputTypeAttribute } from "svelte/elements";
    import { clsx } from "clsx";
    import { stylesMap } from "../../lib/common/styles";

    interface Props {
        required?: boolean;
        type?: HTMLInputTypeAttribute;
        name?: string;
        id?: string;
        autocomplete?: FullAutoFill;
        multiple?: boolean;
        class?: string;
        "aria-describedby"?: string;
    }

    const {
        required,
        type,
        name,
        id,
        autocomplete,
        multiple,
        class: className,
        "aria-describedby": ariaDescribedBy,
    }: Props = $props();
</script>

<input
    {required}
    {type}
    {name}
    {id}
    {autocomplete}
    {multiple}
    aria-describedby={ariaDescribedBy}
    class={clsx(className, stylesMap.input)} />
