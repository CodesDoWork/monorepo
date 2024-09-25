export type DashyConfig = Record<string, PageConfig>;

export interface PageConfig {
    pageInfo: PageInfo;
    appConfig?: AppConfig;
    sections: Section[];
}

export interface PageInfo {
    logo: string;
    title: string;
}

export interface AppConfig {
    customCss: string;
    defaultOpeningMethod: string;
    disableConfigurationForNonAdmin: boolean;
    hideComponents: {
        hideFooter: boolean;
        hideSettings: boolean;
    };
    iconSize: string;
    layout: string;
    preventLocalSave: boolean;
    preventWriteToDisk: boolean;
    theme: string;
    webSearch: {
        openingMethod: string;
        searchEngine: string;
    };
}

export interface Section {
    name: string;
    displayData: {
        cutToHeight: boolean;
    };
    icon: string;
    items?: Item[];
    widgets?: Widget[];
}

export interface Item {
    title: string;
    icon?: string;
    url: string;
    tags?: string[];
}

export interface Widget {
    type: string;
    options: AnyObject;
}

export type AnyObject = Record<string, any>;
