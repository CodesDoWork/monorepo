<script lang="ts">
    import type { PageData } from "./$types";
    import { WidthBox } from "../../components/content-area";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
</script>

<WidthBox>
    {@html data.content}
</WidthBox>
