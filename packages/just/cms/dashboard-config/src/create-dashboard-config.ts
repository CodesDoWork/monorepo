import type {
    CustomDirectusTypes,
    DashboardConfig,
    DashboardItems,
    DashboardPages,
    DashboardPagesDashboardSections,
    DashboardSections,
    DashboardSectionsDashboardItems,
    DashboardSectionsDashboardWidgets,
    DashboardWidgets,
    DirectusFiles,
} from "@cdw/monorepo/just-cms-types";
import type { ActionHandler } from "@directus/types";
import type { Logger } from "pino";
import type { AnyObject, AppConfig, DashyConfig, Item, PageConfig, Widget } from "./dashboard-config";
import { readdirSync, rmSync, writeFileSync } from "node:fs";
import { stringify as stringifyYaml } from "yaml";

const DASHBOARD_CONFIG_DIR = "/dashy/config";
const PUBLIC_URL = "PUBLIC_URL";

type ItemsServiceConstructor = new<Collection extends keyof CustomDirectusTypes>(
    collection: Collection,
    options: any,
) => any;

export function createDashboardConfig(
    logger: Logger,
    services: AnyObject,
    env: AnyObject,
): ActionHandler {
    const { ItemsService: itemsServiceConstructor } = services;
    return ({ collection }, { schema, accountability }) => {
        if (collection.startsWith("dashboard_") && schema && accountability) {
            buildConfig(logger, itemsServiceConstructor, { schema, accountability }, env)
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
    ItemsService: ItemsServiceConstructor,
    serviceOptions: any,
    env: AnyObject,
): Promise<DashyConfig> {
    logger.info("Building dashboard config");
    const appConfig = await getAppConfig(ItemsService, serviceOptions);
    const pages = await getDashboardPages(ItemsService, serviceOptions);
    const config: DashyConfig = {};
    for (const page of pages) {
        config[page.name] = await createPageConfig(page, appConfig, pages, env);
        logger.info(`Built config for page ${page.name}`);
    }

    return config;
}

function getAppConfig(
    ItemsService: ItemsServiceConstructor,
    serviceOptions: any,
): Promise<AppConfig> {
    const configService = new ItemsService("dashboard_config", serviceOptions);

    return configService
        .readSingleton({})
        .then((res: any) => res as DashboardConfig)
        .then((res: any) => ({
            customCss: res.custom_css,
            defaultOpeningMethod: res.default_opening_method,
            disableConfigurationForNonAdmin: res.disable_configuration_for_non_admin,
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
        }));
}

function getDashboardPages(
    ItemsService: ItemsServiceConstructor,
    serviceOptions: any,
): Promise<DashboardPagesResult[]> {
    const pageService = new ItemsService("dashboard_pages", serviceOptions);
    return pageService
        .readByQuery({
            fields: [
                "*",
                "logo.*",
                "sections.dashboard_sections_id.*",
                "sections.dashboard_sections_id.items.dashboard_items_id.*",
                "sections.dashboard_sections_id.items.dashboard_items_id.icon_img.*",
                "sections.dashboard_sections_id.widgets.dashboard_widgets_id.*",
            ],
        })
        .then((res: any) => res as DashboardPagesResult[]);
}

async function createPageConfig(
    page: DashboardPagesResult,
    config: AppConfig,
    pages: DashboardPagesResult[],
    env: AnyObject,
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
        sections:
            page.sections?.map(({ dashboard_sections_id: section }) => ({
                name: section.name,
                icon: section.icon,
                displayData: {
                    cutToHeight: section.cut_to_height,
                },
                items: section.items?.map(createSectionItems(env)),
                widgets: section.widgets?.map(createSectionWidgets),
            })) ?? [],
    };
}

function createSectionItems(env: AnyObject): (item: DashboardSectionsDashboardItemsResult) => Item {
    return ({ dashboard_items_id: item }: DashboardSectionsDashboardItemsResult): Item => ({
        title: item.title,
        icon: item.icon_img
            ? assetUrl(env[PUBLIC_URL], item.icon_img.id)
            : (item.icon ?? undefined),
        url: item.url,
        tags: (item.tags ?? []) as string[],
    });
}

function createSectionWidgets({
    dashboard_widgets_id: widget,
}: DashboardSectionsDashboardWidgetsResult): Widget {
    return {
        type: widget.type,
        options: widget.options as AnyObject,
    };
}

function assetUrl(cmsUrl: string, id: string) {
    return `${cmsUrl}/assets/${id}`;
}

interface DashboardPagesResult extends DashboardPages {
    logo: DirectusFiles | null;
    sections: DashboardPagesDashboardSectionsResult[];
}

interface DashboardPagesDashboardSectionsResult extends DashboardPagesDashboardSections {
    dashboard_sections_id: DashboardSectionsResult;
}

interface DashboardSectionsResult extends DashboardSections {
    items: DashboardSectionsDashboardItemsResult[];
    widgets: DashboardSectionsDashboardWidgetsResult[];
}

interface DashboardSectionsDashboardItemsResult extends DashboardSectionsDashboardItems {
    dashboard_items_id: DashboardItemsResult;
}

interface DashboardItemsResult extends DashboardItems {
    icon_img: DirectusFiles | null;
}

interface DashboardSectionsDashboardWidgetsResult extends DashboardSectionsDashboardWidgets {
    dashboard_widgets_id: DashboardWidgets;
}
