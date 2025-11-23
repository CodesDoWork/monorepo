<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children?: Snippet;
    }

    const { children }: Props = $props();
</script>

<span
    class="
        mt-6 mb-3 block font-bold text-slate-500
        dark:text-slate-300
    ">
    {@render children?.()}
</span>
