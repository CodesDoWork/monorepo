import type { FlatTrans } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import type { RouteFragment, ServerRouteFragment } from "../graphql/default/generated/gql";

export type Route = FlatTrans<RouteFragment>;
export type ServerRoute = FlatTrans<ServerRouteFragment>;
