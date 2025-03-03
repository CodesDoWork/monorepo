<script lang="ts">
    import type { PageData } from "./$types";
    import { PageContent } from "../../../components/content-area";
    import { H1 } from "../../../components/heading";

    export let data: PageData;
    const { currentRoute } = data;
</script>

<PageContent class="isolate">
    <H1>{$currentRoute.name}</H1>
</PageContent>
