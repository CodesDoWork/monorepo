export function formatNumber(value: number, precision = 2, language = "en-US"): string {
    const formatter = new Intl.NumberFormat(language, {
        style: "decimal",
        maximumFractionDigits: precision,
    });
    return formatter.format(value);
}
