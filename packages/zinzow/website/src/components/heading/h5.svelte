<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";
    import { typographyClassMap } from "../../lib/common/typography";

    interface Props {
        class?: string;
        children?: Snippet;
    }

    const { class: className = "", children }: Props = $props();
</script>

<h5 class={clsx(typographyClassMap.h5, className)}>
    {@render children?.()}
</h5>
