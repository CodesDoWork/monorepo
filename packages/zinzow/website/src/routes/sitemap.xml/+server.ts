import { type RequestHandler } from "@sveltejs/kit";
import { create } from "xmlbuilder2";
import { env } from "../../env";

export const GET: RequestHandler = async () => {
    const sitemap = createSitemap(await getSitemapRoutes());
    const xmlDoc = create({ version: "1.0", encoding: "UTF-8" }, sitemap);
    const response = new Response(xmlDoc.end({ prettyPrint: true }));
    response.headers.set("Cache-Control", "max-age=0, s-maxage=3600");
    response.headers.set("Content-Type", "application/xml");

    return response;
};

async function getSitemapRoutes(): Promise<Route[]> {
    return [];
}

function createSitemap(routes: Route[]) {
    return {
        root: {
            urlset: {
                "@xmlns": "https://www.sitemaps.org/schemas/sitemap/0.9",
                "@xmlns:news": "https://www.google.com/schemas/sitemap-news/0.9",
                "@xmlns:xhtml": "https://www.w3.org/1999/xhtml",
                "@xmlns:mobile": "https://www.google.com/schemas/sitemap-mobile/1.0",
                "@xmlns:image": "https://www.google.com/schemas/sitemap-image/1.1",
                "@xmlns:video": "https://www.google.com/schemas/sitemap-video/1.1",
                url: routes.map(createSitemapEntry),
            },
        },
    };
}

function createSitemapEntry(route: Route): SitemapURL {
    return {
        loc: `${env.DOMAIN}${route.loc}`,
        changefreq: route.changefreq || "daily",
        priority: 1.0 / ((route.loc.match(/\//g)?.length || 0) + 1),
        lastmod: route.lastmod,
    };
}

type Route = {
    loc: string;
    changefreq?: ChangeFreq;
    lastmod?: string;
};

interface SitemapURL extends Route {
    changefreq: ChangeFreq;
    priority: number;
}

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
