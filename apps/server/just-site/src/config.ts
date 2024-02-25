import type { Config } from "./types/Config";
import tailwindConfig from "../tailwind.config.js";

const { colors } = tailwindConfig.theme.extend;

function link(name: string, href: string) {
    const isExternal = href.startsWith("http");
    return `<a class="text-[var(--page-color)] hover:underline" href="${href}" ${isExternal ? 'target="_blank" rel="noreferrer noopener"' : ""} title="${name}">${name}</a>`;
}

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
        {
            name: "DitIt",
            thumbnail: "/img/thumbnails/DitIt.png",
        },
    ],
    contact: {
        name: "Justin Konratt",
        socials: {
            GitHub: "CodesDoWork",
            LinkedIn: "justinkonratt",
            Instagram: "justinkonratt",
            YouTube: "DJWazz",
            Gravatar: "justinkonratt",
            Email: "j.konratt@gmx.de",
        },
    },
    about: {
        intro: "Your Passionate Dev and Student of Life",
        bio: [
            "I'm Justin, a software developer from Germany, based in Neubrandenburg/Stralsund.",

            `I'm especially interested in web development and great UX and UI design.
            Furthermore, I love containerization and
            ${link("NX", "https://nx.dev/")} monorepos,
            paying special attention to great DX.
            Far from perfect, I am always learning and experimenting with new stuff.`,

            `Always exploring new facets of life,
            I welcome opportunities for growth, challenges, and new experiences (or technologies).
            I love traveling, reading, and doing sports (like going to the gym, mainly).
            I'm into self-development and am currently discovering spiritual practices too.
            Check out my ${link("reading list", "/reading-list")} for some insights on exciting topics!
            <br />
            Away from keyboard, I also enjoy playing chess, meeting friends, or taking a walk.`,

            `For work, I'm currently in a dual study, working at
            ${link("Clausohm", "https://www.clausohm.de/")}
            and studying at the ${link("HOST", "https://www.hochschule-stralsund.de/")}.
            Our team in “Software-Project-Organization” created a new
            ${link("event platform", "https://events.hochschule-stralsund.de/")}
            for the university using ${link("Mobilizon", "https://joinmobilizon.org")}.
            Now, the bachelor's thesis is the only missing part of my first degree.`,

            `Since I love competitions and am slowly starting to become more active as a developer,
            I hope to participate in some hackathons and conferences in the future!
            Besides some local competitions in school, I also became a WorldSkills Champion.
            In 2022, I won the ${link("bronze medal", "https://worldskills2022se.com/skills/mobile-applications-development/")} in
            ${link("Skill 08 - Mobile Applications Development", "https://worldskills.org/skills/id/562/")}
            at the ${link("WorldSkills Competition Special Edition 2022", "https://worldskills2022se.com/")}.
            Since then, WorldSkills really been a piece of my heart.
            Our team organizes national and international competitions for the ongoing participants in Neubrandenburg
            at our ${link("National Center of Software Development", "https://blz-it.de")}.
            Check out the ${link("livestreams on YouTube", "https://www.youtube.com/@GermanITSkills/videos")}!`,
        ],
        techStack: {
            Backend: [
                "Node.js",
                "Fastify",
                "Express",
                "NestJS",
                "Typeorm",
                "Prisma",
                "TRPC",
                "Python",
                "Java",
                "Elixir",
            ],
            Frontend: ["Svelte", "React", "Vue.js", "Astro", "Angular", "Tailwind", "Bootstrap"],
            CMS: ["Directus", "Strapi"],
            Mobile: ["Android", "React Native", "Kotlin", "Jetpack Compose", "Java"],
            AI: ["Tensorflow", "Pytorch", "Langchain"],
            DevOps: ["Gitlab CI", "Netdata", "Prometheus", "Grafana", "Docker", "Podman"],
            Windows: ["C#"],
            Databases: ["SQLite", "MongoDB", "PostgreSQL"],
            Cloud: ["Cloudflare"],
            Testing: ["Jest", "Puppeteer"],
            Design: ["AdobeXD"],
            Documentation: ["Vitepress", "Markdown", "Mermaid"],
            Other: ["NX", "GraphQL", "Swagger"],
        },
        workExperience: [
            {
                jobTitle: "Software Developer (Dual Student)",
                company: "Clausohm",
                companyUrl: "https://www.clausohm.de",
                companyLogo:
                    "https://scontent-fra5-1.xx.fbcdn.net/v/t39.30808-1/294027622_467511505381533_7852819253614189418_n.png?stp=dst-png_p200x200&_nc_cat=100&ccb=1-7&_nc_sid=596444&_nc_ohc=uLSZDnWrwI4AX_BafSa&_nc_ht=scontent-fra5-1.xx&oh=00_AfCMCbNLpJcZMW4jfU_Mtje8CjWf-ZMQGuJfjV820qmfzw&oe=65E0DA1D",
                datesWorked: "2020 - present",
                responsibilities: `Since I'm only a dual student, I don't work too much and can just work for projects for a limited time.
                    In the practical semester we students worked together on a new project, massively growing our skills.`,
                projectType: "Projects",
                projects: [
                    {
                        name: "Abfuhrmanagement",
                        logo: "https://www.clausohm.de/files/img/logo/CIRCLE_Logo_RGB_zuschnitt.png",
                        description: "Digital management of sewage sludge removal",
                        link: "https://www.clausohm.de/CIRCLE/abfuhrmanagement.html",
                    },
                ],
                technologies: [
                    "React",
                    "Node.js",
                    "Directus",
                    "Kotlin",
                    "Jetpack Compose",
                    "Strapi",
                ],
            },
            {
                jobTitle: "Bachelor Student",
                company: "HOST",
                companyUrl: "https://www.hochschle-stralsund.de",
                companyLogo:
                    "https://www.hochschule-stralsund.de/typo3conf/ext/theme_hsmv_stralsund/Resources/Public/Images/host-logo.svg",
                datesWorked: "2020 - present",
                responsibilities: `Learned various skills, from math over hardware to new web technologies.
                    Expecially BWL (economics) and communication courses were great!
                    I'm currently working on my bachelor's thesis.`,
                projectType: "Projects",
                projects: [
                    {
                        name: "HOST Events",
                        logo: "https://events.hochschule-stralsund.de/img/hs-stralsund/logo_host_dark.png",
                        description: "Event management system for the university",
                        link: "https://events.hochschule-stralsund.de",
                    },
                ],
                technologies: ["Java", "React", "NestJS", "Elixir", "Vue.js", "Android"],
            },
        ],
    },
};
