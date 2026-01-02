type AssetFormat = "auto" | "jpg" | "png" | "webp" | "tiff" | "original";
type AssetFit = "cover" | "contain" | "inside" | "outside";

export interface AssetParams {
    fit?: AssetFit;
    width?: number;
    height?: number;
    quality?: number;
    withoutEnlargement?: boolean;
    format?: AssetFormat;
    download?: boolean;
}

export function assetUrl(cmsUrl: string, id: string, params: AssetParams = {}): string {
    if (!params.format) {
        params.format = "auto";
    } else if (params.format === "original") {
        delete params.format;
    }

    const url = new URL(`${cmsUrl}/assets/${id}`);

    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            url.searchParams.set(key, value);
        }
    });

    return url.toString();
}

interface IdObject {
    id: string;
}

type AssetWithUrl<T extends IdObject> = T & { url: string };

export function addAssetUrl<T extends IdObject>(
    cmsUrl: string,
    asset: T | undefined,
): AssetWithUrl<T> | undefined {
    return asset
        ? {
              ...asset,
              url: assetUrl(cmsUrl, asset.id),
          }
        : undefined;
}
