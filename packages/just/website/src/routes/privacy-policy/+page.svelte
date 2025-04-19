<script lang="ts">
    import type { PageData } from "./$types";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { html } = data;
</script>

<section>
    <article>
        {@html html}
    </article>
</section>
