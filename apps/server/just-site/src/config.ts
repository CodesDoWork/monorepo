import type { Config } from "./types/Config";
import tailwindConfig from "../tailwind.config.js";

const { colors } = tailwindConfig.theme.extend;

export const config: Config = {
    title: "Justin Konratt",
    githubUser: "CodesDoWork",
    routeLinks: [
        {
            label: "Home",
            route: "/",
            description: "Home Page",
            isHero: true,
        },
        {
            label: "Projects",
            route: "/projects",
            color: colors.primary["500"],
            description: "Personal projects, open source work",
            isHero: false,
        },
        {
            label: "Blog",
            route: "/blog",
            color: colors.secondary["500"],
            description: "Articles, notes, tutorials",
            isHero: false,
        },
        {
            label: "Reading List",
            route: "/reading-list",
            color: colors.tertiary["500"],
            description: "Books, recommendations and notes",
            isHero: false,
        },
        {
            label: "Knowledge Base",
            route: "/knowledge-base",
            color: colors.error["500"],
            description: "Personal knowledge base",
            isHero: false,
        },
        {
            label: "Contact",
            route: "/contact",
            color: colors.brandPurple["500"],
            description: "Social profiles and contact form",
            isHero: false,
        },
        {
            label: "About",
            route: "/about",
            color: colors.accent["500"],
            description: "Bio and professional experience",
            isHero: false,
        },
    ],
    footerInfo: {
        author: "Just Site",
        authorSite: "https://just-site.com",
        license: "MIT",
        licenseLink: "https://github.com/just-site/just-site/blob/master/LICENSE",
    },
    contact: {
        name: "Justin Konratt",
        socials: {
            GitHub: "CodesDoWork",
            LinkedIn: "justinkonratt",
            Instagram: "justinkonratt",
            YouTube: "DJWazz",
            Email: "j.konratt@gmx.de",
        },
    },
    projectComplimentaryData: [
        {
            name: "blz-it.de",
            thumbnail: "/img/thumbnails/blz-it.png",
        },
        {
            name: "StarRun",
            thumbnail: "/img/thumbnails/StarRun.png",
        },
        {
            name: "MediaDownloader",
            thumbnail: "/img/thumbnails/media-downloader.png",
        },
        {
            name: "Java-XMLParser",
            thumbnail: "/img/thumbnails/java-xml-parser.webp",
        },
    ],
};
