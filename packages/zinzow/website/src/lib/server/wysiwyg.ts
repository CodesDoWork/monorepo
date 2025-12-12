import { typographyClassMap } from "../common/typography";

export function formatWYSIWYG(html: string): string {
    Object.entries(typographyClassMap).forEach(([tag, className]) => {
        html = html.replaceAll(`<${tag}`, `<${tag} class="${className}"`);
    });

    return html;
}
