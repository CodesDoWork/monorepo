<script lang="ts">
    import type { ComponentProps } from "svelte";
    import Errors from "./Errors.svelte";
    import Textarea from "./Textarea.svelte";

    interface Props extends ComponentProps<typeof Textarea> {
        label: string;
    }

    const { label, class: className, ...inputProps }: Props = $props();
    const labelId = `${inputProps.id}-label`;
</script>

<div class={className}>
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
        <Textarea {...inputProps} aria-describedby={labelId} />
    </div>
</div>
