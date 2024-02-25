/* Get date in month YYYY format*/
export const getMonthYear = (date: Date): string => {
    return `${date.toLocaleString("default", {
        month: "short",
    })}, ${date.getFullYear()}`;
};

/* Get amount of time ago (e.g. 5 days, 1 year) */
export const calculateTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    const intervals = [31536000, 2592000, 86400, 3600, 60];
    const intervalNames = ["year", "month", "day", "hour", "minute"];

    for (let i = 0; i < intervals.length; i++) {
        const interval = Math.floor(seconds / intervals[i]);
        if (interval >= 1) {
            return `${interval} ${intervalNames[i]}${interval > 1 ? "s" : ""} ago`;
        }
    }
    return `${Math.floor(seconds)} seconds ago`;
};
