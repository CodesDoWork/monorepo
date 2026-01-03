<script lang="ts">
    import type { ComponentProps, Snippet } from "svelte";
    import { clsx } from "clsx";
    import Checkbox from "./Checkbox.svelte";
    import Errors from "./Errors.svelte";

    interface Props extends ComponentProps<typeof Checkbox> {
        children: Snippet;
        style?: string;
    }

    const { class: className, children, style, ...inputProps }: Props = $props();
    const labelId = `${inputProps.id}-label`;
</script>

<div class={clsx(className)} {style}>
    <div class="flex items-center gap-2">
        <Checkbox {...inputProps} aria-describedby={labelId} />
        <label for={inputProps.id} id={labelId} class="cursor-pointer">
            {@render children()}
        </label>
    </div>
    <Errors errors={inputProps.errors} />
</div>
