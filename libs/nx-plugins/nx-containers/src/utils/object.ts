export const stringifyCleanObject = (obj: Record<string, unknown>) =>
    JSON.stringify(cleanObject(obj), undefined, 2);

const cleanObject = (obj: Record<string, unknown>) => {
    Object.entries(obj).forEach(([key, value]) => {
        if (value === undefined || (Array.isArray(value) && !value.length)) {
            delete obj[key];
        }
    });

    return obj;
};
