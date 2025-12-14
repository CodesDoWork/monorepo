<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";

    interface Props {
        class?: string;
        children?: Snippet;
    }

    const { class: className = "", children }: Props = $props();
</script>

<li class={clsx(className, "rounded-md bg-(--primary) px-2 py-1 text-white shadow")}>
    {@render children?.()}
</li>
