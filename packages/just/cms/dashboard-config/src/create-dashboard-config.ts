import type { AbstractServiceOptions, ActionHandler, ExtensionsServices } from "@directus/types";
import type { Logger } from "pino";
import type { Env } from "./env";
import type {
    Dashboard_Config,
    Dashboard_Items,
    Dashboard_Pages,
    Dashboard_Pages_Dashboard_Sections,
    Dashboard_Sections,
    Dashboard_Widgets,
    Maybe,
} from "./generated/types";
import type { AnyObject, AppConfig, DashyConfig, Item, PageConfig, Section, Widget } from "./types";
import { readdirSync, rmSync, writeFileSync } from "node:fs";
import { stringify as stringifyYaml } from "yaml";
import { getEnv } from "./env";

const DASHBOARD_CONFIG_DIR = "/dashy/config";
const PUBLIC_URL = "PUBLIC_URL";

export function createDashboardConfig(
    logger: Logger,
    services: ExtensionsServices,
    env: unknown,
): ActionHandler {
    return ({ collection }, { schema, accountability }) => {
        if (collection.startsWith("dashboard_") && schema && accountability) {
            buildConfig(logger, services, { schema, accountability }, getEnv(env))
                .then(saveConfig)
                .then(() => logger.info("Wrote dashboard config to disk"));
        }
    };
}

function saveConfig(config: DashyConfig) {
    cleanConfigDir();
    Object.entries(config).forEach(([page, pageConfig]) => {
        const path = `${DASHBOARD_CONFIG_DIR}/${page}.yml`;
        writeFileSync(path, stringifyYaml(pageConfig));
    });
}

function cleanConfigDir() {
    readdirSync(DASHBOARD_CONFIG_DIR).forEach(file => rmSync(`${DASHBOARD_CONFIG_DIR}/${file}`));
}

async function buildConfig(
    logger: Logger,
    services: ExtensionsServices,
    serviceOptions: AbstractServiceOptions,
    env: Env,
): Promise<DashyConfig> {
    logger.info("Building dashboard config");
    const appConfig = await getAppConfig(services, serviceOptions);
    const pages = await getDashboardPages(services, serviceOptions);
    const config: DashyConfig = {};
    for (const page of pages) {
        config[page.name] = await createPageConfig(page, appConfig, pages, env);
        logger.info(`Built config for page ${page.name}`);
    }

    return config;
}

function getAppConfig(
    services: ExtensionsServices,
    serviceOptions: AbstractServiceOptions,
): Promise<AppConfig> {
    const configService = new services.ItemsService<Dashboard_Config>(
        "dashboard_config",
        serviceOptions,
    );

    return configService
        .readSingleton({})
        .then(res => res as Dashboard_Config)
        .then(
            res =>
                ({
                    customCss: res.custom_css ?? "",
                    defaultOpeningMethod: res.default_opening_method,
                    disableConfigurationForNonAdmin:
                        res.disable_configuration_for_non_admin ?? true,
                    hideComponents: {
                        hideFooter: res.hide_footer,
                        hideSettings: res.hide_settings,
                    },
                    iconSize: res.icon_size,
                    layout: res.layout,
                    preventLocalSave: res.prevent_local_save,
                    preventWriteToDisk: res.prevent_write_to_disk,
                    theme: res.theme,
                    webSearch: {
                        openingMethod: res.websearch_opening_method,
                        searchEngine: res.websearch_search_engine,
                    },
                }) satisfies AppConfig,
        );
}

function getDashboardPages(
    services: ExtensionsServices,
    serviceOptions: AbstractServiceOptions,
): Promise<Dashboard_Pages[]> {
    const pageService = new services.ItemsService<Dashboard_Pages>(
        "dashboard_pages",
        serviceOptions,
    );
    return pageService.readByQuery({
        fields: [
            "*",
            "logo.*",
            "sections.dashboard_sections_id.*",
            "sections.dashboard_sections_id.items.dashboard_items_id.*",
            "sections.dashboard_sections_id.items.dashboard_items_id.icon_img.*",
            "sections.dashboard_sections_id.widgets.dashboard_widgets_id.*",
        ],
    });
}

async function createPageConfig(
    page: Dashboard_Pages,
    config: AppConfig,
    pages: Dashboard_Pages[],
    env: Env,
): Promise<PageConfig> {
    return {
        pageInfo: {
            title: page.title,
            logo: page.logo ? assetUrl(env[PUBLIC_URL], page.logo.id) : undefined,
        },
        pages: pages?.map(dashyPage => ({
            name: dashyPage.title,
            path: `${dashyPage.name}.yml`,
        })),
        appConfig: page.name === "conf" ? config : undefined,
        sections: transformPageSections(page.sections ?? [], env),
    };
}

function transformPageSections(
    sections: Maybe<Dashboard_Pages_Dashboard_Sections>[],
    env: Env,
): Section[] {
    return sections
        .map(section => section?.dashboard_sections_id)
        .filter(Boolean)
        .map(section => section as Dashboard_Sections)
        .map(section => ({
            name: section.name,
            icon: section.icon,
            displayData: {
                cutToHeight: section.cut_to_height ?? false,
            },
            items: section.items
                ?.map(item => item?.dashboard_items_id)
                .filter(Boolean)
                .map(item => item as Dashboard_Items)
                .map(createSectionItems(env)),
            widgets: section.widgets
                ?.map(widget => widget?.dashboard_widgets_id)
                .filter(Boolean)
                .map(widget => widget as Dashboard_Widgets)
                .map(createSectionWidgets)
                ?.filter(Boolean),
        }));
}

function createSectionItems(env: Env) {
    return (item: Dashboard_Items): Item => {
        return {
            title: item.title,
            icon: item.icon_img
                ? assetUrl(env[PUBLIC_URL], item.icon_img.id)
                : (item.icon ?? undefined),
            url: item.url,
            tags: (item.tags ?? []) as string[],
        };
    };
}

function createSectionWidgets(widget: Dashboard_Widgets): Widget {
    return {
        type: widget.type,
        options: widget.options as AnyObject,
    };
}

function assetUrl(cmsUrl: string, id: string) {
    return `${cmsUrl}/assets/${id}`;
}
