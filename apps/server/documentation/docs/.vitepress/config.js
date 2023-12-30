import { config } from "dotenv";
import { withMermaid } from "vitepress-plugin-mermaid";
import { getSidebar } from "vitepress-plugin-auto-sidebar";

config();

const base = process.env["BASE_PATH"] || "/";

const withBase = path => (base.endsWith("/") ? `${base}${path.substring(1)}` : base + path);

let sidebar = getSidebar({
    contentRoot: ".",
    contentDirs: ["./apps/server/documentation/docs"],
    collapsible: true,
    collapsed: true,
});
sidebar = JSON.parse(
    JSON.stringify(sidebar).replace(
        /"link":"\\\\apps\\\\server\\\\documentation\\\\docs/g,
        '"link":"',
    ),
);
sidebar = sidebar[0].items.filter(item => !/About|Index/.test(item.text));

export default withMermaid({
    base,
    title: "Server Docs",
    lang: "en-US",
    outDir: "../../../../dist/apps/server/documentation",
    lastUpdated: true,
    ignoreDeadLinks: true,
    head: [["link", { rel: "shortcut icon", href: withBase("/favicon.ico") }]],
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
            { icon: "github", link: "https://github.com/CodesDoWork/server" },
            { icon: "instagram", link: "https://instagram.com/justinkonratt" },
        ],
        sidebar,
        outline: [2, 3],
        footer: {
            copyright: "Copyright © 2023-present Justin Konratt",
        },
    },
    mermaid: {},
});
