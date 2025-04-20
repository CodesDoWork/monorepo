<script lang="ts">
    import { addJsonLdThings } from "../../contexts/jsonld";
    import type { PageData } from "./$types";

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
