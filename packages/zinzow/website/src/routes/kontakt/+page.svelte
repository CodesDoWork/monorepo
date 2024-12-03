<script lang="ts">
    import { ContentArea } from "../../components/content-area";
    import type { PageData } from "../service copy/$types";

    export let data: PageData;
    const { currentRoute } = data;
</script>

<ContentArea>
    <h1 class="text-3xl">{$currentRoute.name}</h1>
</ContentArea>
