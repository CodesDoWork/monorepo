import type { BSLItem, NutrientPaths, RawBSLItem } from "./bsl-item";
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
                const bslItems = rawBslItems.map(rawBSLItemToBSLItem);
                tagTopNutrients(bslItems, 0.03);

                data = bslItems;
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

function getValueByPath(obj: any, path: string): number | bigint {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

function tagTopNutrients(data: BSLItem[], threshold: number) {
    const sample = data[0];
    const allPaths: NutrientPaths[] = [];

    const findPaths = (obj: any, prefix = "") => {
        for (const key in obj) {
            const fullPath = prefix ? `${prefix}.${key}` : key;
            if (["code", "name", "description"].includes(fullPath)) {
                continue;
            }

            if (typeof obj[key] === "object" && obj[key] !== null) {
                findPaths(obj[key], fullPath);
            } else {
                allPaths.push(fullPath as NutrientPaths);
            }
        }
    };
    findPaths(sample);

    const thresholds = new Map<NutrientPaths, number | bigint>();
    const topPercentileIndex = Math.floor(data.length * (1 - threshold));

    allPaths.forEach(path => {
        const values = data
            .map(item => getValueByPath(item, path))
            .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

        const topPercentile = values[topPercentileIndex];
        if (topPercentile) {
            thresholds.set(path, topPercentile);
        }
    });

    data.forEach(item => {
        thresholds.forEach((threshold, path) => {
            const val = getValueByPath(item, path);
            if (val > 0 && val >= threshold) {
                item.topNutrients.push(path);
            }
        });
    });
}
