export function replaceLinks(text: string): string {
    return text.replace(/<a /g, '<a class="text-[var(--page-color)] hover:underline" ');
}
