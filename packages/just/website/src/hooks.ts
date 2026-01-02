import type { Reroute } from "@sveltejs/kit";
import { reroutePath } from "./lib/common/reroute";

export const reroute: Reroute = async ({ url, fetch }) => {
    return reroutePath(url, fetch);
};
