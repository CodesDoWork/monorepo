import { useLocalStorage } from "./useLocalStorage";

export function useThemeStore() {
    return useLocalStorage("theme", () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    );
}
