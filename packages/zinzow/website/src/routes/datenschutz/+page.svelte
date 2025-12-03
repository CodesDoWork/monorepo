<script lang="ts">
    import { WidthBox } from "../../components/content-area";
    import { H1 } from "../../components/heading";
    import { getNavigationContext } from "../../contexts/navigation";

    const nav = getNavigationContext();
</script>

<WidthBox>
    <H1>{nav.currentRoute?.name}</H1>
</WidthBox>
