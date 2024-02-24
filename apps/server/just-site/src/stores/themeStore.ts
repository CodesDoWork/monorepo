import { localStorageStore } from "./localStorageStore";

export function useThemeStore() {
    return localStorageStore("theme", () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    );
}
