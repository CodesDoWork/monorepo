import type { FlatTrans } from "@cdw/monorepo/shared-graphql";
import type { PageData } from "./$types";

export type Project = FlatTrans<PageData["projects"][number]>;
