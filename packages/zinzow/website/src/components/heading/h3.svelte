<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";
    import { stylesMap } from "../../lib/common/styles";

    interface Props {
        class?: string;
        children?: Snippet;
    }

    const { class: className = "", children }: Props = $props();
</script>

<h3 class={clsx(stylesMap.h3, className)}>
    {@render children?.()}
</h3>
