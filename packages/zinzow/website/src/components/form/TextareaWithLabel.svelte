<script lang="ts">
    import type { ComponentProps } from "svelte";
    import Textarea from "./Textarea.svelte";

    type Props = Omit<ComponentProps<typeof Textarea>, "aria-describedby"> & {
        label: string;
    };

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
    <div class="mt-2.5">
        <Textarea {...inputProps} aria-describedby={labelId} />
    </div>
</div>
