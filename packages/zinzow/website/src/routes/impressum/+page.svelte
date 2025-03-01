<script lang="ts">
    import type { PageData } from "./$types";
    import { ContentArea } from "../../components/content-area";
    import { H1 } from "../../components/heading";

    export let data: PageData;
    const { currentRoute } = data;
</script>

<ContentArea>
    <H1>{$currentRoute?.name}</H1>
</ContentArea>
