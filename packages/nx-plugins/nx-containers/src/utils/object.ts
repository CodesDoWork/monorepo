export const cleanObject = (obj: Record<string, unknown>) => {
    Object.entries(obj).forEach(([key, value]) => {
        if (value === undefined || (Array.isArray(value) && !value.length)) {
            delete obj[key];
        }
    });

    return obj;
};
