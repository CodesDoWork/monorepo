<script lang="ts">
    import { ContentArea } from "../../components/content-area";
    import { H1 } from "../../components/heading";
    import type { PageData } from "./$types";

    export let data: PageData;
    const { currentRoute } = data;
</script>

<ContentArea>
    <H1>{$currentRoute?.name}</H1>
</ContentArea>
