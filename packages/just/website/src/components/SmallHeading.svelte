<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children?: Snippet;
    }

    const { children }: Props = $props();
</script>

<span class="block mt-6 font-bold text-slate-500 dark:text-slate-300 mb-3">
    {@render children?.()}
</span>
