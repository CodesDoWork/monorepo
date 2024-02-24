import type { Config } from "./types/Config";
import tailwindConfig from "../tailwind.config.js";

const { colors } = tailwindConfig.theme.extend;

export const config: Config = {
    title: "Just Site",
    description: "Just Site",
    githubUser: "just-site",
    routeLinks: [
        {
            label: "Home",
            route: "/",
            color: "#000000",
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
        email: "justin@konratts.de",
        website: "https://justin.konratts.de",
        socials: {
            GitHub: "CodesDoWork",
            LinkedIn: "in/justinkonratt",
            Instagram: "justinkonratt",
            YouTube: "DJWazz",
        },
        socialButtonLimit: 6,
        mailerConfig: {
            service_id: "gmail",
            template_id: "website-contact-form",
            user_id: "",
            template_params: {},
        },
    },
};
