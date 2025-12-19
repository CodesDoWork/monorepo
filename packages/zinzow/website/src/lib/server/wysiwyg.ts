import { stylesMap } from "../common/styles";

export function formatWYSIWYG(html: string): string {
    Object.entries(stylesMap).forEach(([tag, className]) => {
        html = html.replaceAll(`<${tag}`, `<${tag} class="${className}"`);
    });

    return html;
}
