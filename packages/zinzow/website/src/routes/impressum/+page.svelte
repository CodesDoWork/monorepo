<script lang="ts">
    import type { PageData } from "./$types";
    import { WidthBox } from "../../components/content-area";
    import { H1 } from "../../components/heading";

    export let data: PageData;
    const { currentRoute } = data;
</script>

<WidthBox>
    <H1>{$currentRoute?.name}</H1>
</WidthBox>
