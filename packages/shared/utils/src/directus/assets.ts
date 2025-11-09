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

    const { CMS_URL } = process.env;
    if (!CMS_URL) {
        throw new Error("CMS_URL is not defined in environment variables");
    }

    const url = new URL(`${CMS_URL}/assets/${id}`);

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

export function addAssetUrl<T extends IdObject>(asset: T | undefined): AssetWithUrl<T> | undefined {
    return asset
        ? {
              ...asset,
              url: assetUrl(asset.id),
          }
        : undefined;
}
