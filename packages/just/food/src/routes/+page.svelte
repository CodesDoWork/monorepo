<script lang="ts">
    import type { PageData } from "./$types";
    import { asyncBufferFromUrl, parquetReadObjects } from "hyparquet";
    import { compressors } from "hyparquet-compressors";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();

    $effect(() => {
        asyncBufferFromUrl({ url: "/data/bls_4_0_2025_de-brotli.parquet" }).then(file => {
            parquetReadObjects({ file, compressors }).then(data => {
                console.log(data.length);
            });
        });
    });
</script>

<p>Hello</p>
