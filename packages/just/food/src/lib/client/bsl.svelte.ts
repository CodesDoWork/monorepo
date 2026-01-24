import type { BSLItem, RawBSLItem } from "./bsl-item";
import { asyncBufferFromUrl, parquetReadObjects } from "hyparquet";
import { compressors } from "hyparquet-compressors";
import { rawBSLItemToBSLItem } from "./bsl-item";

export function getBSLData() {
    let data = $state<BSLItem[]>([]);
    let isLoading = $state(true);

    $effect(() => {
        asyncBufferFromUrl({ url: "/data/bls_4_0_2025_de-brotli.parquet" }).then(file => {
            parquetReadObjects({ file, compressors }).then(rawItems => {
                const rawBslItems = rawItems as RawBSLItem[];
                data = rawBslItems.map(rawBSLItemToBSLItem);
                isLoading = false;
            });
        });
    });

    return {
        get isLoading() {
            return isLoading;
        },
        get data() {
            return data;
        },
    };
}
