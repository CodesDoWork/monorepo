import { stylesMap } from "../common/styles";

export function formatWYSIWYG(html: string, extraStyles: Record<string, string> = {}): string {
    Object.entries(stylesMap).forEach(([tag, className]) => {
        if (extraStyles[tag]) {
            className += ` ${extraStyles[tag]}`;
        }

        html = html.replaceAll(`<${tag}`, `<${tag} class="${className}"`);
    });

    return html;
}

export function wysiwygToText(html: string): string {
    return html.replace(/<[^>]+>/g, "");
}
