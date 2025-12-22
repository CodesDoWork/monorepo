<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";
    import { stylesMap } from "../../lib/common/styles";

    interface Props {
        class?: string;
        style?: string;
        children?: Snippet;
    }

    const { class: className, style, children }: Props = $props();
</script>

<h2 {style} class={clsx(stylesMap.h2, className)}>
    {@render children?.()}
</h2>
