import { BaseAppGeneratorSchema } from "../apps/schema";

export type NginxAppGeneratorSchema = BaseAppGeneratorSchema & {
    nginxVersion?: string;
    nginxConf?: string;
    confFolder?: string;
    templatesFolder?: string;
    htmlFolder?: string;
};
