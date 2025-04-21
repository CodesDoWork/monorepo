import type { FlatTrans } from "@cdw/monorepo/packages/shared/utils/src/svelte/graphql/translations";
import type { PageData } from "./$types";

export type Project = FlatTrans<PageData["projects"][number]>;
