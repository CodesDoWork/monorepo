<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";
    import { stylesMap } from "../../lib/common/styles";

    interface Props {
        class?: string;
        lang?: string;
        children?: Snippet;
    }

    const { class: className, lang, children }: Props = $props();
</script>

<p {lang} class={clsx(className, stylesMap.p)}>{@render children?.()}</p>
