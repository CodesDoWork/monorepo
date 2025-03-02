/* Get date in month YYYY format */
export function getMonthYear(date: string | Date): string {
    date = new Date(date);
    return `${date.toLocaleString("default", {
        month: "short",
    })}, ${date.getFullYear()}`;
}

const TIME_INTERVALS = {
    year: 31_536_000,
    month: 2_592_000,
    day: 86_400,
    hour: 3_600,
    minute: 60,
    second: 1,
};

/* Get amount of time ago (e.g. 5 days, 1 year) */
export function calculateTimeAgo(date: string | Date): string {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    for (const [unit, intervalSize] of Object.entries(TIME_INTERVALS)) {
        const interval = Math.floor(seconds / intervalSize);
        if (interval) {
            return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
        }
    }

    return "just now";
}
