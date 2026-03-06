<script lang="ts">
    import type { PageData } from "./$types";
    import { WidthBox } from "../../components/content-area";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    // svelte-ignore state_referenced_locally
    // because server side data only loaded once
    const { content } = data;
</script>

<WidthBox>
    {@html content}
</WidthBox>
