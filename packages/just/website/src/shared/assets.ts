import { env } from "../env";

type AssetFormat = "auto" | "jpg" | "png" | "webp" | "tiff" | "original";
type AssetFit = "cover" | "contain" | "inside" | "outside";

interface AssetParams {
    fit?: AssetFit;
    width?: number;
    height?: number;
    quality?: number;
    withoutEnlargement?: boolean;
    format?: AssetFormat;
    download?: boolean;
}

export function assetUrl(id: string, params: AssetParams = {}): string {
    if (!params.format) {
        params.format = "auto";
    } else if (params.format === "original") {
        delete params.format;
    }

    const url = new URL(`${env.CMS_URL}/assets/${id}`);

    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            url.searchParams.set(key, value);
        }
    });

    return url.toString();
}
