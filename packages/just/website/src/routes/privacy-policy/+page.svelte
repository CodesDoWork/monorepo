<script lang="ts">
    import type { PageData } from "./$types";
    import { addJsonLdThings } from "@cdw/monorepo/shared-utils/svelte/contexts/jsonld";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { html, jsonLdThings } = data;
    addJsonLdThings(jsonLdThings);
</script>

<section>
    <article>
        {@html html}
    </article>
</section>
