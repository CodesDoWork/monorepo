<script lang="ts">
    import type { Snippet } from "svelte";
    import { P } from ".";

    interface Props {
        lang?: string;
        children?: Snippet;
    }

    const { lang, children }: Props = $props();
</script>

<P
    {lang}
    class="
        text-justify hyphens-auto text-slate-600
        dark:text-slate-300
    ">
    {@render children?.()}
</P>
