<script lang="ts">
    import type { ComponentProps, Snippet } from "svelte";
    import { clsx } from "clsx";
    import Checkbox from "./Checkbox.svelte";
    import Errors from "./Errors.svelte";

    interface Props extends ComponentProps<typeof Checkbox> {
        children?: Snippet;
        style?: string;
    }

    let {
        class: className,
        children,
        style,
        checked = $bindable(),
        input = $bindable(),
        ...inputProps
    }: Props = $props();
    const labelId = `${inputProps.id}-label`;
</script>

<div class={clsx(className)} {style}>
    <div class="flex items-center gap-2">
        <Checkbox {...inputProps} bind:checked bind:input aria-describedby={labelId} />
        {#if children}
            <label for={inputProps.id} id={labelId} class="cursor-pointer">
                {@render children()}
            </label>
        {/if}
    </div>
    <Errors errors={inputProps.errors} />
</div>
