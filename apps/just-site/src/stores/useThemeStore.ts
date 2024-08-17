import type { Writable } from "svelte/store";
import { useLocalStorage } from "./useLocalStorage";

export function useThemeStore(): Writable<string> {
    return useLocalStorage("theme", () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    );
}
