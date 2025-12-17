<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";
    import { typographyClassMap } from "../../lib/common/typography";

    interface Props {
        class?: string;
        children?: Snippet;
    }

    const { class: className, children }: Props = $props();
</script>

<h4 class={clsx(typographyClassMap.h4, className)}>
    {@render children?.()}
</h4>
