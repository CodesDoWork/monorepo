import { defineHook } from "@directus/extensions-sdk";
import { createDashboardConfig } from "./create-dashboard-config";

export default defineHook(({ action }, { logger, services, env }) => {
    const actionHandler = createDashboardConfig(logger, services, env);
    action(`items.create`, actionHandler);
    action(`items.update`, actionHandler);
    action(`items.delete`, actionHandler);
});
