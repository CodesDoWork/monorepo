<script lang="ts">
    import type { ComponentProps } from "svelte";
    import Errors from "./Errors.svelte";
    import FileInput from "./FileInput.svelte";

    interface Props extends ComponentProps<typeof FileInput> {
        label: string;
        fileInputClass?: string;
    }

    const { label, class: className, fileInputClass, style, ...inputProps }: Props = $props();
    const labelId = $derived(`${inputProps.id}-label`);
</script>

<div class={className} {style}>
    <label
        for={inputProps.id}
        id={labelId}
        class="
            block text-sm/6 font-semibold text-gray-900
            dark:text-white
        ">
        {label}
    </label>
    <Errors errors={inputProps.errors} />
    <div class="mt-2.5">
        <FileInput inputClass={fileInputClass} {...inputProps} aria-describedby={labelId} />
    </div>
</div>
