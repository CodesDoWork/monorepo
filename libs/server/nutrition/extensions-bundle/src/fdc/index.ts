import { defineEndpoint } from "@directus/extensions-sdk";
import { EndpointConfig } from "@directus/types";
import { Services, SettingsService } from "../types/types";
import { FDCApi } from "./api/fdc-api";

export default defineEndpoint(async (router, { services, getSchema }) => {
    const schema = await getSchema();
    const { SettingsService } = services as Services;
    const settingsService = new SettingsService({ schema });

    router.get("/food/:fdcId", async (req, res) => {
        const apiKey = await getApiKey(settingsService);
        const api = new FDCApi("https://api.nal.usda.gov", apiKey);

        res.json(await api.getItem(req.params.fdcId));
    });
}) as EndpointConfig;

async function getApiKey(settingsService: SettingsService): Promise<string> {
    return settingsService.readOne(1).then(res => res.fdc_api_key);
}
