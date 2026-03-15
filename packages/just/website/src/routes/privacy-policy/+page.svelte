<script lang="ts">
    import type { PageData } from "./$types";
    import { addJsonLdThings } from "@cdw/monorepo/shared-svelte-contexts";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { jsonLdThings, html } = $derived(data);
    $effect(() => addJsonLdThings(jsonLdThings));
</script>

<section>
    <article>
        {@html html}
    </article>
</section>
