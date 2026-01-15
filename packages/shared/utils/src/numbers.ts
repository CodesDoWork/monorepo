export function formatNumber(value: number, precision = 2, language = "en-US"): string {
    const formatter = new Intl.NumberFormat(language, {
        style: "decimal",
        maximumFractionDigits: precision,
    });
    return formatter.format(value);
}

export function formatDuration(seconds: number) {
    seconds = Math.round(seconds);

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return h > 0
        ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
        : `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
