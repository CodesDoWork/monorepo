<script lang="ts">
    import { PageContent } from "../../../components/content-area";
    import { H1 } from "../../../components/heading";
    import { getNavigationContext } from "../../../contexts/navigation";

    const nav = getNavigationContext();
</script>

<PageContent class="isolate">
    <H1>{nav.currentRoute?.name}</H1>
</PageContent>
