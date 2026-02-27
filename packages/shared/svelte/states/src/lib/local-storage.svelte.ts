export interface LocalStorageState<T> {
    get value(): T | null;
    set value(newValue: T | null);
    remove: () => void;
}

export function getLocalStorageState<T = string>(
    key: string,
    defaultValue: T | null = null,
): LocalStorageState<T> {
    let value = $state<T | null>(null);

    $effect(() => {
        const stored = localStorage.getItem(key);
        value = stored ? (JSON.parse(stored) as T) : defaultValue;
    });

    function remove() {
        localStorage.removeItem(key);
    }

    return {
        get value() {
            return value;
        },
        set value(newValue: T | null) {
            value = newValue;
            if (newValue) {
                localStorage.setItem(key, JSON.stringify(newValue));
            } else {
                remove();
            }
        },
        remove,
    };
}
