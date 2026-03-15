import type { DeepNullable, PathsOf } from "@cdw/monorepo/shared-utils/objects";
import type { PerfectBSLItem } from "./perfect";

export type NutrientPaths = Exclude<PathsOf<PerfectBSLItem>, "code" | "name" | "description">;

export interface BSLItem extends DeepNullable<PerfectBSLItem> {
    isSelected: boolean;
    topNutrients: NutrientPaths[];
    _searchStr: string;
}

const keysToExcludeFromDisplay: (keyof BSLItem)[] = [
    "code",
    "description",
    "name",
    "topNutrients",
    "isSelected",
    "_searchStr",
];

export function isDetailKey(key: string): boolean {
    return !keysToExcludeFromDisplay.includes(key as keyof BSLItem);
}
