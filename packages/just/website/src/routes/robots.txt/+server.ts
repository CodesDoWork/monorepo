import type { RequestHandler } from "@sveltejs/kit";
import { env } from "../../env";
import { addPriorityRoute } from "../../shared/navigation/priority-routes";

addPriorityRoute("/robots.txt");

export const GET: RequestHandler = async () => {
    const content = ["User-agent: *", "Allow: /", `Sitemap: ${env.URL}/sitemap.xml`].join("\n");
    const response = new Response(content);
    response.headers.set("Cache-Control", "max-age=0, s-maxage=3600");
    response.headers.set("Content-Type", "text/plain");

    return response;
};
