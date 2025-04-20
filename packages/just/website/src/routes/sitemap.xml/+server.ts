import type { RequestHandler } from "@sveltejs/kit";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { create } from "xmlbuilder2";
import { env } from "../../env";
import { GetSitemapServerData } from "../../graphql/default/generated/gql";
import { transformRoutes } from "../../shared/routes";
import { addPriorityRoute } from "../../shared/navigation/priority-routes";

addPriorityRoute("/sitemap.xml");

export const GET: RequestHandler = async () => {
    const sitemap = createSitemap(await getSitemapRoutes());
    const xmlDoc = create({ version: "1.0", encoding: "UTF-8" }, sitemap);
    const response = new Response(xmlDoc.end({ prettyPrint: true }));
    response.headers.set("Cache-Control", "max-age=0, s-maxage=3600");
    response.headers.set("Content-Type", "application/xml");

    return response;
};

async function getSitemapRoutes(): Promise<SitemapURL[]> {
    const { routes } = await toPromise(GetSitemapServerData({}));
    const transformedRoutes = transformRoutes(routes);

    const urls: SitemapURL[] = [];
    transformedRoutes.forEach(r => {
        r.translations.forEach(t => {
            urls.push({
                loc: `${env.URL}${t.route}`,
                changefreq: "monthly",
                "xhtml:link": r.translations.map(t => ({
                    "@rel": "alternate",
                    "@hreflang": t.language.short,
                    "@href": `${env.URL}${t.route}`,
                })),
            });
        });
    });

    return urls;
}

function createSitemap(routes: SitemapURL[]) {
    return {
        urlset: {
            "@xmlns": "https://www.sitemaps.org/schemas/sitemap/0.9",
            "@xmlns:news": "https://www.google.com/schemas/sitemap-news/0.9",
            "@xmlns:xhtml": "https://www.w3.org/1999/xhtml",
            "@xmlns:mobile": "https://www.google.com/schemas/sitemap-mobile/1.0",
            "@xmlns:image": "https://www.google.com/schemas/sitemap-image/1.1",
            "@xmlns:video": "https://www.google.com/schemas/sitemap-video/1.1",
            url: routes,
        },
    };
}

interface SitemapURL {
    loc: string;
    changefreq: ChangeFreq;
    "xhtml:link": AlternateLink[];
}

interface AlternateLink {
    "@rel": "alternate";
    "@hreflang": string;
    "@href": string;
}

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
