import type { FlatTrans } from "@cdw/monorepo/shared-graphql";
import type { RouteFragment, ServerRouteFragment } from "../graphql/default/generated/graphql";

export type Route = FlatTrans<RouteFragment>;
export type ServerRoute = FlatTrans<ServerRouteFragment>;
