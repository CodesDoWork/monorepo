<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";
    import { clsx } from "clsx";
    import { buttonClass } from "./style";

    interface Props extends HTMLButtonAttributes {}

    const { class: className, children, ...rest }: Props = $props();
</script>

<button class={clsx(className, buttonClass)} {...rest}>
    {@render children?.()}
</button>
