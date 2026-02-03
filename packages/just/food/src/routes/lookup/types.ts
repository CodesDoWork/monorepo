import type { PathsOf } from "@cdw/monorepo/packages/shared/utils/src/objects";
import type { BSLItem } from "../../lib/client/bsl-item";

export interface SelectableItem {
    name: string;
    isSelected: boolean;
}

export type BSLItemPaths = PathsOf<BSLItem>;
