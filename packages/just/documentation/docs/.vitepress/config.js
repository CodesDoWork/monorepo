import { getSidebar } from "vitepress-plugin-auto-sidebar";
import { withMermaid } from "vitepress-plugin-mermaid";

let sidebar = getSidebar({
    contentRoot: ".",
    contentDirs: ["."],
    collapsible: true,
    collapsed: true,
});

sidebar = sidebar[0].items.filter(item => !/About|Index/.test(item.text));

export default withMermaid({
    title: "Server Docs",
    lang: "en-US",
    outDir: process.env.VITEPRESS_OUT_DIR,
    lastUpdated: true,
    ignoreDeadLinks: true,
    head: [["link", { rel: "shortcut icon", href: "/favicon.ico" }]],
    themeConfig: {
        siteTitle: "Server Docs",
        logo: "/icon.svg",
        nav: [
            {
                text: "About",
                link: "/about",
            },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/CodesDoWork" },
            { icon: "instagram", link: "https://instagram.com/justinkonratt" },
            {
                link: "https://justinkonratt.com",
            },
        ],
        sidebar,
        outline: [2, 3],
        footer: {
            copyright: "Copyright © 2023-present Justin Konratt",
        },
    },
    mermaid: {},
});
