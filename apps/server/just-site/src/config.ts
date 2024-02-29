import type { Config } from "./types/Config";
import tailwindConfig from "../tailwind.config.js";

const { colors } = tailwindConfig.theme.extend;

function link(name: string, href: string) {
    const isExternal = href.startsWith("http");
    return `<a class="text-[var(--page-color)] hover:underline" href="${href}" ${isExternal ? 'target="_blank" rel="noreferrer noopener"' : ""} title="${name}">${name}</a>`;
}

export const config: Config = {
    title: "Justin Konratt",
    keywords: "dev developer competition learning self-development personality",
    githubUser: "CodesDoWork",
    routeLinks: [
        {
            label: "Home",
            route: "/",
            description: "Your Passionate Dev and Student of Life",
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
            Away from keyboard, I love traveling, reading, and doing sports (like going to the gym, mainly).
            I'm into self-development and am currently discovering spiritual practices too.
            Check out my ${link("reading list", "/reading-list")} for some insights on exciting topics!
            <br />
            I also enjoy playing chess, meeting friends, or taking a walk.`,

            `For work, I'm currently in a dual study, working at
            ${link("Clausohm", "https://www.clausohm.de/")}
            and studying at the ${link("HOST", "https://www.hochschule-stralsund.de/")}.
            Our team in “Software-Project-Organization” created a new
            ${link("event platform", "https://events.hochschule-stralsund.de/")}
            for the university using ${link("Mobilizon", "https://joinmobilizon.org")}.
            Now, the bachelor's thesis is the only missing part of my first degree.`,

            `Since I love competitions and am slowly starting to become more active as a developer,
            I hope to participate in some hackathons and conferences in the future!
            Besides some local competitions in school, I also became a WorldSkills Champion in 2022.
            I won the ${link("bronze medal", "https://worldskills2022se.com/skills/mobile-applications-development/")} in
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
                responsibilities: `Since I'm only a dual student, I and can just work on projects for a limited time. In the practical semester I could massively learn from working on a project for a long time!`,
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
                    "Node.js",
                    "Directus",
                    "Kotlin",
                    "Jetpack Compose",
                    "React",
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
                technologies: ["Java", "React", "NestJS", "Android", "Elixir", "Vue.js"],
            },
        ],
    },
    readingList: [
        {
            title: "Die Gesetze der Gewinner",
            isbn: "978-3-423-34048-9",
            rating: 4,
            featured: false,
            categories: ["Mindset"],
            description: "30 principles underlined with stories for a successful life",
        },
        {
            title: "NLP",
            isbn: "978-0-06-208361-6",
            rating: 5,
            featured: true,
            categories: ["Mindset", "Skills", "NLP", "Psychology"],
            description:
                "Learn about NLP in detail and how to use it for yourself and for your relationships",
        },
        {
            title: "Der 4-Stunden Körper",
            isbn: "9780307463630",
            rating: 5,
            featured: true,
            categories: ["Body & Health", "Masculinity"],
            description:
                "Science based insights into unbelievable capabilities of the body, training plans, and other useful stuff for hacking your biology.",
        },
        {
            title: "Rich Dad Poor Dad",
            isbn: "9781978691704",
            rating: 3,
            featured: false,
            categories: ["Mindset", "Finance"],
            description: "Mindset for wealth packed into a story",
        },
        {
            title: "Think and Grow Rich",
            isbn: "9781463538002",
            rating: 4,
            featured: true,
            categories: ["Mindset", "Spirituality"],
            description: "Stories about success principles with very deep meanings",
        },
        {
            title: "Estrogeneration",
            isbn: "9781946546012",
            rating: 5,
            featured: true,
            categories: ["Body & Health"],
            description: "Scientific view on modern world poisons",
        },
        {
            title: "How to be a stoic",
            isbn: "9781846045080",
            rating: 3,
            featured: false,
            categories: ["Philosophy"],
            description: "An insight into stoicism",
        },
        {
            title: "Neurohacks",
            isbn: "9780143129356",
            rating: 4,
            featured: false,
            categories: ["Skills", "Productivity"],
            description:
                "Understanding brain activity and how to bring you in the flow. Furthermore, it covers how to build dream teams.",
        },
        {
            title: "The Way of Men",
            isbn: "9780578824000",
            rating: 5,
            featured: true,
            categories: ["Masculinity"],
            description:
                "Travel through time and discover how the way of men developed and what masculinity is. The best outline on masculinity I've ever read!",
        },
        {
            title: "Meditations",
            isbn: "9780140449334",
            rating: 3,
            featured: false,
            categories: ["Philosophy"],
            description: "Ancient wisdom, full of deep meaning. Insights into stoic philosophy.",
        },
        {
            title: "Thinking on Purpose",
            isbn: "9780998716732",
            rating: 3,
            featured: false,
            categories: ["NLP", "Mindset", "Psychology"],
            description:
                "Control your thinking and stop pattern causing negative thoughts and/or behavior.",
        },
        {
            title: "Speed Reading",
            isbn: "9780563520351",
            rating: 4,
            featured: true,
            categories: ["Skills"],
            description: "Learn how to read 1000 words/minute (e.g. multiple rows at once).",
        },
        {
            title: "The One Thing",
            isbn: "9781885167774",
            rating: 4,
            featured: true,
            categories: ["Productivity"],
            description: "How to be laser-focused and get things done.",
        },
        {
            title: "Deep Work",
            isbn: "9781455586691",
            rating: 4,
            featured: true,
            categories: ["Productivity"],
            description:
                "Deep insights into the essence of deep work and how to work deeply yourself.",
        },
        {
            title: "The Way of the Superior Man",
            isbn: "9781683641957",
            rating: 4,
            featured: true,
            categories: ["Spirituality", "Sexuality", "Love", "Masculinity"],
            description: "A spiritual view on your masculine essence and how to deal with women.",
        },
        {
            title: "Blue Truth",
            isbn: "9781591792598",
            rating: 4,
            featured: false,
            categories: ["Spirituality", "Love"],
            description: "A deep spiritual journey into opening as love.",
        },
        {
            title: "Intimate Communion",
            isbn: "155874374X",
            rating: 4,
            featured: false,
            categories: ["Spirituality", "Love", "Sexuality", "Psychology"],
            description:
                "About the 3 stages of intimate relationship and how to connect to your inner core and sexual essence.",
        },
        {
            title: "Wild Nights",
            isbn: "9781591792338",
            rating: 3,
            featured: false,
            categories: ["Spirituality", "Sexuality"],
            description:
                "Crazy/Wild stories with a whole new perspective on love and sexuality. Quite provocative and with deep spiritual meaning.",
        },
        {
            title: "Wie man Freunde gewinnt",
            isbn: "9783426776728",
            rating: 3,
            featured: false,
            categories: ["Communication", "Psychology"],
            description:
                "How to establish new relationships and win or work together with business partners.",
        },
        {
            title: "Der Weg zur Finanziellen Freiheit",
            isbn: "9783423340007",
            rating: 4,
            featured: false,
            categories: ["Finance"],
            description:
                "How to make more and keep money. E.g. Factors, boundaries, questions are discussed.",
        },
        {
            title: "Clean Code",
            isbn: "0132350882",
            rating: 4,
            featured: true,
            categories: ["Skills"],
            description:
                "Old but still largely applicable for modern projects. A guide on how to write clean code.",
        },
        {
            title: "Reicher als die Geissens",
            isbn: "9783981806113",
            rating: 4,
            featured: false,
            categories: ["Mindset", "Finance"],
            description:
                "Good insights on money flow and basic outline on how to use real estate to grow your wealth.",
            cover: {
                small: "/img/books/reicher-als-die-geissens.jpg",
                medium: "/img/books/reicher-als-die-geissens.jpg",
                large: "/img/books/reicher-als-die-geissens.jpg",
            },
        },
        {
            title: "Atomic Habits",
            isbn: "9781847941831",
            rating: 4,
            featured: false,
            categories: ["Productivity"],
            description:
                'How to establish new habits and get rid of old ones. How our daily habits and the "small" things shape our in lifes.',
        },
        {
            title: "Die 4-Stunden Woche",
            isbn: "9780307465351",
            rating: 4,
            featured: true,
            categories: ["Finance", "Productivity"],
            description:
                "How to automate and delegate yourself away and work less for same results.",
        },
        {
            title: "Das Taschenbuch für Gründer",
            isbn: "9783947473175",
            url: "",
            authors: [
                { name: "Thomas Klußmann", url: "" },
                { name: "Christoph J.F. Schreiber", url: "" },
            ],
            rating: 3,
            featured: false,
            categories: ["Mindset", "Finance", "Skills"],
            description: "SHORT guide on how to found a company and operate your business",
            cover: {
                small: "/img/books/das-taschenbuch-fuer-gruender.png",
                medium: "/img/books/das-taschenbuch-fuer-gruender.png",
                large: "/img/books/das-taschenbuch-fuer-gruender.png",
            },
        },
        {
            title: "Leaders eat last",
            isbn: "9781591845324",
            rating: 5,
            featured: false,
            categories: ["Leadership", "Communication", "Skills"],
            description: "How to be a good leader",
        },
        {
            title: "The Subtle Art of Not Giving a Fuck",
            isbn: "9780062899149",
            rating: 4,
            featured: true,
            categories: ["Mindset"],
            description: "A fresh world view and new perspective on the role of pain.",
            cover: {
                small: "/img/books/the-subtle-art-of-not-giving-a-fuck.jpg",
                medium: "/img/books/the-subtle-art-of-not-giving-a-fuck.jpg",
                large: "/img/books/the-subtle-art-of-not-giving-a-fuck.jpg",
            },
        },
        {
            title: "Digitale Dominanz",
            isbn: "9783947473083",
            url: "",
            authors: [{ name: "Christoph J.F. Schreiber", url: "" }],
            rating: 3,
            featured: false,
            categories: ["Finance", "Skills"],
            description: "Basic book on how to make deals and gains more customers",
            cover: {
                small: "/img/books/digitale-dominanz.webp",
                medium: "/img/books/digitale-dominanz.webp",
                large: "/img/books/digitale-dominanz.webp",
            },
        },
        {
            title: "Entscheidung: Erfolg",
            isbn: "9783947473083",
            url: "",
            authors: [{ name: "Dirk Kreuter", url: "" }],
            rating: 1,
            featured: false,
            categories: ["Mindset"],
            description: "Beginner book for mindset and motivation",
            cover: {
                small: "/img/books/entscheidung-erfolg.png",
                medium: "/img/books/entscheidung-erfolg.png",
                large: "/img/books/entscheidung-erfolg.png",
            },
        },
        {
            title: "Von 0 zur ersten Million",
            isbn: "9783947473083",
            url: "",
            authors: [{ name: "Marc Galal", url: "" }],
            rating: 3,
            featured: false,
            categories: ["Mindset"],
            description:
                "A novel on mindset with especially good description of our inner believe and filter system.",
            cover: {
                small: "/img/books/von-0-zur-ersten-million.jpg",
                medium: "/img/books/von-0-zur-ersten-million.jpg",
                large: "/img/books/von-0-zur-ersten-million.jpg",
            },
        },
        {
            title: "Schlaf im 21. Jahrhundert",
            isbn: "9783000603464",
            url: "",
            authors: [{ name: "Fabian Dittrich", url: "" }],
            rating: 3,
            featured: false,
            categories: ["Body & Health"],
            description: "A basic book on good sleep and how sleep works.",
            cover: {
                small: "/img/books/schlaf-im-21-jahrhundert.jpg",
                medium: "/img/books/schlaf-im-21-jahrhundert.jpg",
                large: "/img/books/schlaf-im-21-jahrhundert.jpg",
            },
        },
        {
            title: "Make Girls Chase You",
            isbn: "",
            url: "",
            authors: [{ name: "Andrew Ryan", url: "" }],
            rating: 3,
            featured: false,
            categories: ["Dating", "Mindset", "Psychology"],
            description:
                "Just tried it out a few years ago. Dating game explained and strategies for playing it. WARNING: Manipulative material! Good to know, dangerous to use. Don't play games or fake another personality, follow your deepest truth, and stay virtuous.",
            cover: {
                small: "/img/books/make-girls-chase-you.webp",
                medium: "/img/books/make-girls-chase-you.webp",
                large: "/img/books/make-girls-chase-you.webp",
            },
        },
        {
            title: "66 Texts that make her chase you for sex",
            isbn: "",
            url: "",
            authors: [{ name: "Andrew Ryan", url: "" }],
            rating: 2,
            featured: false,
            categories: ["Dating", "Psychology"],
            description:
                "Second book of the author going into detail about the texting game. WARNING: Manipulative material! Good to know, dangerous to use. Don't play games or fake another personality, follow your deepest truth, and stay virtuous.",
            cover: {
                small: "/img/books/66-texts-that-make-her-chase-you-for-sex.webp",
                medium: "/img/books/66-texts-that-make-her-chase-you-for-sex.webp",
                large: "/img/books/66-texts-that-make-her-chase-you-for-sex.webp",
            },
        },
    ],
};
