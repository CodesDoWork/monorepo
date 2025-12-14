<script lang="ts">
    import type { Snippet } from "svelte";
    import { clsx } from "clsx";
    import { typographyClassMap } from "../../lib/common/typography";

    interface Props {
        class?: string;
        children?: Snippet;
        lang?: string;
        prose?: boolean;
        block?: boolean;
    }

    const { class: className = "", children, lang, prose = false, block = false }: Props = $props();
</script>

<p
    {lang}
    class={clsx(
        typographyClassMap.p,
        className,
        prose && "max-w-prose",
        block && "text-justify hyphens-auto",
    )}>
    {@render children?.()}
</p>
