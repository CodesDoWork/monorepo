import { defineModule } from "@directus/extensions-sdk";
import ModuleComponent from "./lib/module.vue";

export default defineModule({
    id: "analytics",
    name: "Analytics",
    icon: "analytics",
    routes: [
        {
            path: "/analytics",
            component: ModuleComponent,
        },
    ],
});
