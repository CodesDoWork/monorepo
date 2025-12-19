<script lang="ts">
    import type { ComponentProps } from "svelte";
    import { clsx } from "clsx";
    import Errors from "./Errors.svelte";
    import Input from "./Input.svelte";

    interface Props extends ComponentProps<typeof Input> {
        label: string;
    }

    const { label, class: className, ...inputProps }: Props = $props();
    const labelId = `${inputProps.id}-label`;
</script>

<div class={clsx(className, "flex flex-col justify-between")}>
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
        <Input {...inputProps} aria-describedby={labelId} />
    </div>
</div>
