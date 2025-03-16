import { getAssetUrl } from "../assets";

interface IdObject {
    id: string;
}

type AssetWithUrl<T extends IdObject> = T & { url: string };

export function addAssetUrl<T extends IdObject>(asset: T | undefined): AssetWithUrl<T> | undefined {
    return asset
        ? {
              ...asset,
              url: getAssetUrl(asset.id),
          }
        : undefined;
}
