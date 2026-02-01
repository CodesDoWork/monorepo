<script lang="ts">
    import type { HTMLAnchorAttributes } from "svelte/elements";
    import { clsx } from "clsx";
    import { buttonClass } from "./style";

    interface Props extends HTMLAnchorAttributes {}

    const { class: className, children, ...rest }: Props = $props();
</script>

<a class={clsx(className, buttonClass)} {...rest}>
    {@render children?.()}
</a>
