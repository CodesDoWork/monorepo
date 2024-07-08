import type { Writable } from "svelte/store";
import { useLocalStorage } from "./useLocalStorage";

export function useThemeStore<T>(): Writable<T> {
    return useLocalStorage<T>("theme", () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    );
}
