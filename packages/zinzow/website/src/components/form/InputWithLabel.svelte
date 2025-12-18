<script lang="ts">
    import type { ComponentProps } from "svelte";
    import Input from "./Input.svelte";

    type Props = Omit<ComponentProps<typeof Input>, "aria-describedby"> & {
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
        <Input {...inputProps} aria-describedby={labelId} />
    </div>
</div>
