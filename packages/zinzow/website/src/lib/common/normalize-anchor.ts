export function normalizeAnchor(name: string) {
    return name.toLowerCase().replace(/ /g, "-");
}
