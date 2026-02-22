// Disables access to DOM typings like `HTMLElement` which are not available
// inside a service worker and instantiates the correct globals
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// Ensures that the `$service-worker` import has proper type definitions
/// <reference types="@sveltejs/kit" />

import { asyncBufferFromUrl, parquetReadObjects } from "hyparquet";
import { compressors } from "hyparquet-compressors";
import parquetFile from "../data/bls_4_0_2025_de-brotli.parquet?url";
import { rawBSLItemToBSLItem } from "../lib/client/bsl-item";

const self = globalThis.self as unknown as ServiceWorkerGlobalScope;

self.onmessage = () => {
    getBSLData().then(data => self.postMessage(data));
};

function getBSLData() {
    return asyncBufferFromUrl({ url: parquetFile }).then(file => {
        return parquetReadObjects({ file, compressors }).then(rawItems => {
            const rawBslItems = rawItems as RawBSLItem[];
            const bslItems = rawBslItems.map(rawBSLItemToBSLItem);
            tagTopNutrients(bslItems, 0.03);

            return bslItems;
        });
    });
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
