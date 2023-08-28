import { PrimaryKey, SchemaOverview, Settings } from "@directus/types";

export interface Services {
    SettingsService: Service<SettingsService>;
}

export interface Service<T> extends Function {
    new (args: { schema: SchemaOverview }): T;
}

export interface SettingsService {
    readOne: (key: PrimaryKey) => Promise<NutritionSettings>;
}

export interface NutritionSettings extends Settings {
    fdc_api_key: string;
}
