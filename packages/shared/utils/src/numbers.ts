export function formatNumber(value: number, precision = 2, language = "en-US"): string {
    const formatter = new Intl.NumberFormat(language, {
        style: "decimal",
        maximumFractionDigits: precision,
    });
    return formatter.format(value);
}

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3_600;

export function formatDuration(seconds: number) {
    seconds = Math.round(seconds);

    const h = Math.floor(seconds / SECONDS_PER_HOUR);
    const m = Math.floor((seconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
    const s = seconds % SECONDS_PER_MINUTE;

    return h > 0
        ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
        : `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
