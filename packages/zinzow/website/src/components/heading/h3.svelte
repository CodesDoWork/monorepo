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

<h3 class={clsx(typographyClassMap.h3, className)}>
    {@render children?.()}
</h3>
