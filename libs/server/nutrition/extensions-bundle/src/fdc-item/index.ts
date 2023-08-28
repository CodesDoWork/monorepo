import { defineDisplay } from "@directus/extensions-sdk";
import FDCItem from "./lib/fdc-item.vue";

export default defineDisplay({
    id: "fdc-item",
    name: "FDC Item",
    icon: "database",
    description: "Displays FDC data for a fdc_id",
    component: FDCItem,
    options: null,
    types: ["string"],
});
