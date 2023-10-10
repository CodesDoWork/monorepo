import { config } from "dotenv";
import { withMermaid } from "vitepress-plugin-mermaid";

config();

const base = process.env["BASE_PATH"] || "/";

const withBase = path => (base.endsWith("/") ? `${base}${path.substring(1)}` : base + path);

export default withMermaid({
    base,
    title: "Server Docs",
    lang: "en-US",
    outDir: "../../../../dist/apps/server/documentation",
    lastUpdated: true,
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
        sidebar: [
            {
                text: "Process",
                items: [
                    { text: "Getting Started", link: "/process/getting-started" },
                    { text: "Roadmap", link: "/process/roadmap" },
                ],
            },
            {
                text: "Services",
                items: [
                    { text: "Overview", link: "/services/" },
                    { text: "Documentation", link: "/services/documentation" },
                    { text: "Backups", link: "/services/backups" },
                    { text: "Database", link: "/services/db" },
                    { text: "Music", link: "/services/music" },
                    { text: "Reverse Proxy", link: "/services/reverse-proxy" },
                ],
            },
            {
                text: "CI/CD",
                items: [
                    { text: "Overview", link: "/cicd/" },
                    { text: "Git", link: "/cicd/git" },
                    { text: "TeamCity", link: "/cicd/teamcity" },
                    { text: "Sonarqube", link: "/cicd/sonarqube" },
                ],
            },
        ],
        outline: [2, 3],
        footer: {
            copyright: "Copyright © 2023-present Justin Konratt",
        },
    },
    mermaid: {},
});
