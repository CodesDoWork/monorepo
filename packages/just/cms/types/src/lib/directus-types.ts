export interface Companies {
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    logo: string | DirectusFiles;
    name: string;
    url: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface DashboardConfig {
    custom_css: string;
    date_created?: string | null;
    date_updated?: string | null;
    default_opening_method: string;
    disable_configuration_for_non_admin: boolean;
    hide_footer: boolean;
    hide_settings: boolean;
    icon_size: string;
    id: string;
    layout: string;
    prevent_local_save: boolean;
    prevent_write_to_disk: boolean;
    theme: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    websearch_opening_method: string;
    websearch_search_engine: string;
}

export interface DashboardItems {
    date_created?: string | null;
    date_updated?: string | null;
    icon?: string | null;
    icon_img?: string | DirectusFiles | null;
    id: string;
    tags?: unknown | null;
    title: string;
    url: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface DashboardPages {
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    logo?: string | DirectusFiles | null;
    name: string;
    sections: any[] | DashboardPagesDashboardSections[];
    sort?: number | null;
    title: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface DashboardPagesDashboardSections {
    dashboard_pages_id?: string | DashboardPages | null;
    dashboard_sections_id?: string | DashboardSections | null;
    id: number;
    sort?: number | null;
}

export interface DashboardSections {
    cut_to_height: boolean;
    date_created?: string | null;
    date_updated?: string | null;
    icon: string;
    id: string;
    items: any[] | DashboardSectionsDashboardItems[];
    name: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    widgets: any[] | DashboardSectionsDashboardWidgets[];
}

export interface DashboardSectionsDashboardItems {
    dashboard_items_id?: string | DashboardItems | null;
    dashboard_sections_id?: string | DashboardSections | null;
    id: number;
    sort?: number | null;
}

export interface DashboardSectionsDashboardWidgets {
    dashboard_sections_id?: string | DashboardSections | null;
    dashboard_widgets_id?: string | DashboardWidgets | null;
    id: number;
    sort?: number | null;
}

export interface DashboardWidgets {
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    options: unknown;
    type: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface DirectusAccess {
    id: string;
    policy: string | DirectusPolicies;
    role?: string | DirectusRoles | null;
    sort?: number | null;
    user?: string | DirectusUsers | null;
}

export interface DirectusActivity {
    action: string;
    collection: string;
    comment?: string | null;
    id: number;
    ip?: string | null;
    item: string;
    origin?: string | null;
    revisions: any[] | DirectusRevisions[];
    timestamp: string;
    user?: string | DirectusUsers | null;
    user_agent?: string | null;
}

export interface DirectusCollections {
    accountability?: string | null;
    archive_app_filter: boolean;
    archive_field?: string | null;
    archive_value?: string | null;
    collapse: string;
    collection: string;
    color?: string | null;
    display_template?: string | null;
    group?: string | DirectusCollections | null;
    hidden: boolean;
    icon?: string | null;
    item_duplication_fields?: unknown | null;
    note?: string | null;
    preview_url?: string | null;
    singleton: boolean;
    sort?: number | null;
    sort_field?: string | null;
    translations?: unknown | null;
    unarchive_value?: string | null;
    versioning: boolean;
}

export interface DirectusDashboards {
    color?: string | null;
    date_created?: string | null;
    icon: string;
    id: string;
    name: string;
    note?: string | null;
    panels: any[] | DirectusPanels[];
    user_created?: string | DirectusUsers | null;
}

export interface DirectusExtensions {
    bundle?: string | null;
    enabled: boolean;
    folder: string;
    id: string;
    source: string;
}

export interface DirectusFields {
    collection: string | DirectusCollections;
    conditions?: unknown | null;
    display?: string | null;
    display_options?: unknown | null;
    field: string;
    group?: string | DirectusFields | null;
    hidden: boolean;
    id: number;
    interface?: string | null;
    note?: string | null;
    options?: unknown | null;
    readonly: boolean;
    required?: boolean | null;
    sort?: number | null;
    special?: unknown | null;
    translations?: unknown | null;
    validation?: unknown | null;
    validation_message?: string | null;
    width?: string | null;
}

export interface DirectusFiles {
    charset?: string | null;
    created_on: string;
    description?: string | null;
    duration?: number | null;
    embed?: string | null;
    filename_disk?: string | null;
    filename_download: string;
    filesize?: number | null;
    focal_point_x?: number | null;
    focal_point_y?: number | null;
    folder?: string | DirectusFolders | null;
    height?: number | null;
    id: string;
    location?: string | null;
    metadata?: unknown | null;
    modified_by?: string | DirectusUsers | null;
    modified_on: string;
    storage: string;
    tags?: unknown | null;
    title?: string | null;
    tus_data?: unknown | null;
    tus_id?: string | null;
    type?: string | null;
    uploaded_by?: string | DirectusUsers | null;
    uploaded_on?: string | null;
    width?: number | null;
}

export interface DirectusFlows {
    accountability?: string | null;
    color?: string | null;
    date_created?: string | null;
    description?: string | null;
    icon?: string | null;
    id: string;
    name: string;
    operation?: string | DirectusOperations | null;
    operations: any[] | DirectusOperations[];
    options?: unknown | null;
    status: string;
    trigger?: string | null;
    user_created?: string | DirectusUsers | null;
}

export interface DirectusFolders {
    id: string;
    name: string;
    parent?: string | DirectusFolders | null;
}

export interface DirectusMigrations {
    name: string;
    timestamp?: string | null;
    version: string;
}

export interface DirectusNotifications {
    collection?: string | null;
    id: number;
    item?: string | null;
    message?: string | null;
    recipient: string | DirectusUsers;
    sender?: string | DirectusUsers | null;
    status?: string | null;
    subject: string;
    timestamp?: string | null;
}

export interface DirectusOperations {
    date_created?: string | null;
    flow: string | DirectusFlows;
    id: string;
    key: string;
    name?: string | null;
    options?: unknown | null;
    position_x: number;
    position_y: number;
    reject?: string | DirectusOperations | null;
    resolve?: string | DirectusOperations | null;
    type: string;
    user_created?: string | DirectusUsers | null;
}

export interface DirectusPanels {
    color?: string | null;
    dashboard: string | DirectusDashboards;
    date_created?: string | null;
    height: number;
    icon?: string | null;
    id: string;
    name?: string | null;
    note?: string | null;
    options?: unknown | null;
    position_x: number;
    position_y: number;
    show_header: boolean;
    type: string;
    user_created?: string | DirectusUsers | null;
    width: number;
}

export interface DirectusPermissions {
    action: string;
    collection: string;
    fields?: unknown | null;
    id: number;
    permissions?: unknown | null;
    policy: string | DirectusPolicies;
    presets?: unknown | null;
    validation?: unknown | null;
}

export interface DirectusPolicies {
    admin_access: boolean;
    app_access: boolean;
    description?: string | null;
    enforce_tfa: boolean;
    icon: string;
    id: string;
    ip_access?: unknown | null;
    name: string;
    permissions: any[] | DirectusPermissions[];
    roles: any[] | DirectusAccess[];
    users: any[] | DirectusAccess[];
}

export interface DirectusPresets {
    bookmark?: string | null;
    collection?: string | null;
    color?: string | null;
    filter?: unknown | null;
    icon?: string | null;
    id: number;
    layout?: string | null;
    layout_options?: unknown | null;
    layout_query?: unknown | null;
    refresh_interval?: number | null;
    role?: string | DirectusRoles | null;
    search?: string | null;
    user?: string | DirectusUsers | null;
}

export interface DirectusRelations {
    id: number;
    junction_field?: string | null;
    many_collection: string;
    many_field: string;
    one_allowed_collections?: unknown | null;
    one_collection?: string | null;
    one_collection_field?: string | null;
    one_deselect_action: string;
    one_field?: string | null;
    sort_field?: string | null;
}

export interface DirectusRevisions {
    activity: number | DirectusActivity;
    collection: string;
    data?: unknown | null;
    delta?: unknown | null;
    id: number;
    item: string;
    parent?: number | DirectusRevisions | null;
    version?: string | DirectusVersions | null;
}

export interface DirectusRoles {
    children: any[] | DirectusRoles[];
    description?: string | null;
    icon: string;
    id: string;
    name: string;
    parent?: string | DirectusRoles | null;
    policies: any[] | DirectusAccess[];
    users: any[] | DirectusUsers[];
    users_group: string;
}

export interface DirectusSessions {
    expires: string;
    ip?: string | null;
    next_token?: string | null;
    origin?: string | null;
    share?: string | DirectusShares | null;
    token: string;
    user?: string | DirectusUsers | null;
    user_agent?: string | null;
}

export interface DirectusSettings {
    auth_login_attempts?: number | null;
    auth_password_policy?: string | null;
    basemaps?: unknown | null;
    custom_aspect_ratios?: unknown | null;
    custom_css?: string | null;
    default_appearance: string;
    default_language: string;
    default_theme_dark?: string | null;
    default_theme_light?: string | null;
    id: number;
    mapbox_key?: string | null;
    module_bar?: unknown | null;
    project_color: string;
    project_descriptor?: string | null;
    project_logo?: string | DirectusFiles | null;
    project_name: string;
    project_url?: string | null;
    public_background?: string | DirectusFiles | null;
    public_favicon?: string | DirectusFiles | null;
    public_foreground?: string | DirectusFiles | null;
    public_note?: string | null;
    public_registration: boolean;
    public_registration_email_filter?: unknown | null;
    public_registration_role?: string | DirectusRoles | null;
    public_registration_verify_email: boolean;
    report_bug_url?: string | null;
    report_error_url?: string | null;
    report_feature_url?: string | null;
    storage_asset_presets?: unknown | null;
    storage_asset_transform?: string | null;
    storage_default_folder?: string | DirectusFolders | null;
    theme_dark_overrides?: unknown | null;
    theme_light_overrides?: unknown | null;
    theming_group: string;
}

export interface DirectusShares {
    collection: string | DirectusCollections;
    date_created?: string | null;
    date_end?: string | null;
    date_start?: string | null;
    id: string;
    item: string;
    max_uses?: number | null;
    name?: string | null;
    password?: string | null;
    role?: string | DirectusRoles | null;
    times_used?: number | null;
    user_created?: string | DirectusUsers | null;
}

export interface DirectusTranslations {
    id: string;
    key: string;
    language: string;
    value: string;
}

export interface DirectusUsers {
    appearance?: string | null;
    auth_data?: unknown | null;
    avatar?: string | DirectusFiles | null;
    description?: string | null;
    email?: string | null;
    email_notifications?: boolean | null;
    external_identifier?: string | null;
    first_name?: string | null;
    id: string;
    language?: string | null;
    last_access?: string | null;
    last_name?: string | null;
    last_page?: string | null;
    location?: string | null;
    password?: string | null;
    policies: any[] | DirectusAccess[];
    provider: string;
    role?: string | DirectusRoles | null;
    status: string;
    tags?: unknown | null;
    tfa_secret?: string | null;
    theme_dark?: string | null;
    theme_dark_overrides?: unknown | null;
    theme_light?: string | null;
    theme_light_overrides?: unknown | null;
    title?: string | null;
    token?: string | null;
}

export interface DirectusVersions {
    collection: string | DirectusCollections;
    date_created?: string | null;
    date_updated?: string | null;
    hash?: string | null;
    id: string;
    item: string;
    key: string;
    name?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface DirectusWebhooks {
    actions: unknown;
    collections: unknown;
    data: boolean;
    headers?: unknown | null;
    id: number;
    method: string;
    migrated_flow?: string | DirectusFlows | null;
    name: string;
    status: string;
    url: string;
    was_active_before_deprecation: boolean;
}

export interface JustCashAccount {
    account_details: any[] | JustCashAccountDetails[];
    color?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    groups: any[] | JustCashGroup[];
    id: string;
    items: any[] | JustCashItem[];
    name: string;
    sort?: number | null;
    user: string | DirectusUsers;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface JustCashAccountDetails {
    account: string | JustCashAccount;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    name: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    value: string;
}

export interface JustCashGroup {
    account: string | JustCashAccount;
    children: any[] | JustCashGroup[];
    color?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    items: any[] | JustCashItem[];
    name: string;
    parent?: string | JustCashGroup | null;
    sort?: number | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface JustCashItem {
    account?: string | JustCashAccount | null;
    asset_amount?: number | null;
    asset_identifier?: string | null;
    color?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    group?: string | JustCashGroup | null;
    id: string;
    income?: number | null;
    name: string;
    sort?: number | null;
    type: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    value?: number | null;
}

export interface JustCashOutput {
    date_created?: string | null;
    date_updated?: string | null;
    from: string | JustCashItem;
    id: string;
    percentage: number;
    to: string | JustCashItem;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface JustSiteBlogEntries {
    content: string;
    cover: string | DirectusFiles;
    date_created?: string | null;
    date_updated?: string | null;
    excerpt: string;
    featured: boolean;
    id: string;
    slug: string;
    title: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface JustSiteBookCategories {
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    name: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface JustSiteBooks {
    authors?: unknown | null;
    book_categories: any[] | JustSiteBooksJustSiteBookCategories[];
    cover?: string | DirectusFiles | null;
    date_created?: string | null;
    date_updated?: string | null;
    description: string;
    featured: boolean;
    id: string;
    isbn?: string | null;
    title: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface JustSiteBooksJustSiteBookCategories {
    id: number;
    just_site_book_categories_id?: string | JustSiteBookCategories | null;
    just_site_books_id?: string | JustSiteBooks | null;
}

export interface JustSiteInfo {
    about_bio: string;
    about_intro: string;
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    keywords: unknown;
    name: string;
    project_license: string;
    project_license_url: string;
    project_platform?: string | SocialNetworks | null;
    project_url: string;
    socials: any[] | JustSiteInfoSocials[];
    technologies: any[] | JustSiteInfoTechnologies[];
    title: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface JustSiteInfoSocials {
    id: number;
    just_site_info_id?: string | JustSiteInfo | null;
    socials_id?: string | Socials | null;
}

export interface JustSiteInfoTechnologies {
    id: number;
    just_site_info_id?: string | JustSiteInfo | null;
    technologies_id?: string | Technologies | null;
}

export interface JustSiteProjectData {
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    name: string;
    thumbnail: string | DirectusFiles;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface JustSiteRoutes {
    color: string;
    date_created?: string | null;
    date_updated?: string | null;
    description: string;
    id: string;
    in_nav: boolean;
    is_hero: boolean;
    name: string;
    route: string;
    sort?: number | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface JustSiteWorkExperience {
    company: string | Companies;
    date_created?: string | null;
    date_updated?: string | null;
    end_year?: number | null;
    id: string;
    job_title: string;
    projects: any[] | JustSiteWorkExperienceJustSiteWorkProjects[];
    responsibilities: string;
    start_year: number;
    technologies: any[] | JustSiteWorkExperienceTechnologies[];
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface JustSiteWorkExperienceJustSiteWorkProjects {
    id: number;
    just_site_work_experience_id?: string | JustSiteWorkExperience | null;
    just_site_work_projects_id?: string | JustSiteWorkProjects | null;
}

export interface JustSiteWorkExperienceTechnologies {
    id: number;
    just_site_work_experience_id?: string | JustSiteWorkExperience | null;
    technologies_id?: string | Technologies | null;
}

export interface JustSiteWorkProjects {
    date_created?: string | null;
    date_updated?: string | null;
    description: string;
    id: string;
    link: string;
    logo: string | DirectusFiles;
    name: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface SocialNetworks {
    base_user_link: string;
    date_created?: string | null;
    date_updated?: string | null;
    display_at: boolean;
    icon: string;
    id: string;
    name: string;
    tone: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface Socials {
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    name: string;
    platform: string | SocialNetworks;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface TechStack {
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    name: string;
    technologies: any[] | TechStackTechnologies[];
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface TechStackTechnologies {
    id: number;
    tech_stack_id?: string | TechStack | null;
    technologies_id?: string | Technologies | null;
}

export interface Technologies {
    date_created?: string | null;
    date_updated?: string | null;
    id: string;
    name: string;
    tech_stacks: any[] | TechStackTechnologies[];
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
}

export interface CustomDirectusTypes {
    companies: Companies[];
    dashboard_config: DashboardConfig;
    dashboard_items: DashboardItems[];
    dashboard_pages: DashboardPages[];
    dashboard_pages_dashboard_sections: DashboardPagesDashboardSections[];
    dashboard_sections: DashboardSections[];
    dashboard_sections_dashboard_items: DashboardSectionsDashboardItems[];
    dashboard_sections_dashboard_widgets: DashboardSectionsDashboardWidgets[];
    dashboard_widgets: DashboardWidgets[];
    directus_access: DirectusAccess[];
    directus_activity: DirectusActivity[];
    directus_collections: DirectusCollections[];
    directus_dashboards: DirectusDashboards[];
    directus_extensions: DirectusExtensions[];
    directus_fields: DirectusFields[];
    directus_files: DirectusFiles[];
    directus_flows: DirectusFlows[];
    directus_folders: DirectusFolders[];
    directus_migrations: DirectusMigrations[];
    directus_notifications: DirectusNotifications[];
    directus_operations: DirectusOperations[];
    directus_panels: DirectusPanels[];
    directus_permissions: DirectusPermissions[];
    directus_policies: DirectusPolicies[];
    directus_presets: DirectusPresets[];
    directus_relations: DirectusRelations[];
    directus_revisions: DirectusRevisions[];
    directus_roles: DirectusRoles[];
    directus_sessions: DirectusSessions[];
    directus_settings: DirectusSettings;
    directus_shares: DirectusShares[];
    directus_translations: DirectusTranslations[];
    directus_users: DirectusUsers[];
    directus_versions: DirectusVersions[];
    directus_webhooks: DirectusWebhooks[];
    just_cash_account: JustCashAccount[];
    just_cash_account_details: JustCashAccountDetails[];
    just_cash_group: JustCashGroup[];
    just_cash_item: JustCashItem[];
    just_cash_output: JustCashOutput[];
    just_site_blog_entries: JustSiteBlogEntries[];
    just_site_book_categories: JustSiteBookCategories[];
    just_site_books: JustSiteBooks[];
    just_site_books_just_site_book_categories: JustSiteBooksJustSiteBookCategories[];
    just_site_info: JustSiteInfo;
    just_site_info_socials: JustSiteInfoSocials[];
    just_site_info_technologies: JustSiteInfoTechnologies[];
    just_site_project_data: JustSiteProjectData[];
    just_site_routes: JustSiteRoutes[];
    just_site_work_experience: JustSiteWorkExperience[];
    just_site_work_experience_just_site_work_projects: JustSiteWorkExperienceJustSiteWorkProjects[];
    just_site_work_experience_technologies: JustSiteWorkExperienceTechnologies[];
    just_site_work_projects: JustSiteWorkProjects[];
    social_networks: SocialNetworks[];
    socials: Socials[];
    tech_stack: TechStack[];
    tech_stack_technologies: TechStackTechnologies[];
    technologies: Technologies[];
}
