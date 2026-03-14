// Disables access to DOM typings like `HTMLElement` which are not available
// inside a service worker and instantiates the correct globals
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// Ensures that the `$service-worker` import has proper type definitions
/// <reference types="@sveltejs/kit" />

import type { BSLItem, NutrientPaths } from "../lib/client/bsl-item";
import { asyncBufferFromUrl, parquetReadObjects } from "hyparquet";
import { compressors } from "hyparquet-compressors";
import parquetFile from "../data/bls_4_0_2025_de-brotli.parquet?url";
import { rawBSLItemToBSLItem } from "../lib/client/bsl-item/bsl-item";

const self = globalThis.self as unknown as ServiceWorkerGlobalScope;

self.onmessage = () => {
    getBSLData().then(data => self.postMessage(data));
};

function getBSLData() {
    return asyncBufferFromUrl({ url: parquetFile }).then(file => {
        return parquetReadObjects({ file, compressors }).then(rawItems => {
            const rawBslItems = rawItems as RawBSLItem[];
            const bslItems = rawBslItems.map(rawBSLItemToBSLItem);
            const topNutrientsFraction = 0.03;
            tagTopNutrients(bslItems, topNutrientsFraction);

            return bslItems;
        });
    });
}

function getValueByPath(obj: Record<string, unknown>, path: string): number | bigint {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

function tagTopNutrients(data: BSLItem[], threshold: number) {
    const thresholds = new Map<NutrientPaths, number | bigint>();
    const topPercentileIndex = Math.floor(data.length * (1 - threshold));

    const nutrientPaths = getNutrientPaths(data[0]);
    nutrientPaths.forEach(path => {
        const values = data.map(item => getValueByPath(item, path)).sort((a, b) => a - b);
        const topPercentile = values[topPercentileIndex];
        if (topPercentile) {
            thresholds.set(path, topPercentile);
        }
    });

    data.forEach(item => {
        thresholds.forEach((t, path) => {
            const val = getValueByPath(item, path);
            if (val > 0 && val >= t) {
                item.topNutrients.push(path);
            }
        });
    });
}

function getNutrientPaths(obj: Record<string, unknown>, prefix = ""): NutrientPaths[] {
    const paths: NutrientPaths[] = [];
    for (const key in obj) {
        const path = getPath(key, prefix);
        if (["code", "name", "description"].includes(path)) {
            continue;
        }

        const value = obj[key];
        paths.push(...(isObject(value) ? getNutrientPaths(value, path) : [path as NutrientPaths]));
    }

    return paths;
}

function getPath(key: string, prefix: string): string {
    return prefix ? `${prefix}.${key}` : key;
}

function isObject(obj: unknown): obj is Record<string, unknown> {
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}
