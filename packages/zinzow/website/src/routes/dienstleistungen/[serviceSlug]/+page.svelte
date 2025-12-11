<script lang="ts">
    import type { PageData } from "./$types";
    import { PageContent } from "../../../components/content-area";
    import DirectusImage from "../../../components/directus-image/DirectusImage.svelte";
    import { H1 } from "../../../components/heading";
    import { getNavigationContext } from "../../../contexts/navigation";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { description, images } = data;
    const nav = getNavigationContext();
</script>

<PageContent class="isolate">
    <H1>{nav.currentRoute?.name}</H1>
    {@html description}
    {#each images as img}
        <DirectusImage {img} />
    {/each}
</PageContent>
