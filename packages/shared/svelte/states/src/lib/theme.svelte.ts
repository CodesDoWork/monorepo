/* eslint-disable no-unused-vars */
export enum Theme {
    Light = "light",
    Dark = "dark",
    OS = "os",
}
/* eslint-enable no-unused-vars */

const themes = Object.values(Theme);

export const ThemeIcons = {
    [Theme.Dark]: "icon-[material-symbols--desktop-windows-outline-rounded]",
    [Theme.Light]: "icon-[material-symbols--dark-mode-outline]",
    [Theme.OS]: "icon-[material-symbols--light-mode-outline]",
} satisfies Record<Theme, string>;

const LOCAL_STORAGE_KEY = "theme";

export interface ThemeState {
    theme: Theme;
    displayedTheme: Theme.Dark | Theme.Light;
    toggleNextTheme: () => void;
}

export function getTheme(): ThemeState {
    const mediaTheme = getMediaTheme();
    let theme = $state<Theme>(Theme.OS);
    $effect(() => {
        const localValue = localStorage.getItem(LOCAL_STORAGE_KEY) as Theme | null;
        theme = localValue && themes.includes(localValue) ? localValue : Theme.OS;
    });

    const displayedTheme = $derived(theme === Theme.OS ? mediaTheme.theme : theme);
    $effect(() => setDocumentTheme(displayedTheme));
    function setDocumentTheme(value: Theme.Dark | Theme.Light) {
        const { classList } = document.documentElement;
        value === Theme.Dark ? classList.add("dark") : classList.remove("dark");
    }

    function toggleNextTheme() {
        const currentThemeIdx = themes.indexOf(theme);
        const nextThemeIdx = (currentThemeIdx + 1) % themes.length;
        theme = themes[nextThemeIdx] as Theme;
    }

    return {
        get theme() {
            return theme;
        },
        get displayedTheme() {
            return displayedTheme;
        },
        set theme(value: Theme) {
            theme = value;
            localStorage.setItem(LOCAL_STORAGE_KEY, value);
        },
        toggleNextTheme,
    };
}

export function getMediaTheme() {
    let mediaPrefersDark = $state(false);
    const mediaTheme = $derived(mediaPrefersDark ? Theme.Dark : Theme.Light);

    function onMediaChange(event: MediaQueryListEvent) {
        mediaPrefersDark = event.matches;
    }

    $effect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        mediaPrefersDark = media.matches;
        media.addEventListener("change", onMediaChange);

        return () => {
            media.removeEventListener("change", onMediaChange);
        };
    });

    return {
        get theme() {
            return mediaTheme;
        },
    };
}
