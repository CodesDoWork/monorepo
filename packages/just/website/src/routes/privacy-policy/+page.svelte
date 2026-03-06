<script lang="ts">
    import type { PageData } from "./$types";
    import { addJsonLdThings } from "@cdw/monorepo/shared-svelte-contexts";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { jsonLdThings } = $derived(data);
    // svelte-ignore state_referenced_locally
    // because server side data only loaded once
    const { html } = data;
    $effect(() => addJsonLdThings(jsonLdThings));
</script>

<section>
    <article>
        {@html html}
    </article>
</section>
