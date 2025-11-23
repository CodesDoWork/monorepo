<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children?: Snippet;
    }

    const { children }: Props = $props();
</script>

<p
    class="
        text-justify hyphens-auto text-slate-600
        dark:text-slate-300
    ">
    {@render children?.()}
</p>
