export enum Theme {
    Light = "light",
    Dark = "dark",
    OS = "os",
}

const LOCAL_STORAGE_KEY = "theme";

export interface ThemeState {
    theme: Theme;
    displayedTheme: Theme.Dark | Theme.Light;
    setTheme: (theme: Theme) => void;
}

export function getTheme(): ThemeState {
    let theme = $state<Theme>(Theme.Light);
    let mediaPrefersDark = $state(false);
    const mediaTheme = $derived(mediaPrefersDark ? Theme.Dark : Theme.Light);

    const displayedTheme = $derived(theme === Theme.OS ? mediaTheme : theme);
    $effect(() => setDocumentTheme(displayedTheme));

    function setDocumentTheme(value: Theme.Dark | Theme.Light) {
        if (value === Theme.Dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }

    function onMediaChange(event: MediaQueryListEvent) {
        mediaPrefersDark = event.matches;
    }

    $effect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        mediaPrefersDark = media.matches;
        media.addEventListener("change", onMediaChange);

        const localValue = localStorage.getItem(LOCAL_STORAGE_KEY);
        theme =
            localValue && Object.values(Theme).includes(localValue as Theme)
                ? (localValue as Theme)
                : Theme.OS;

        return () => {
            media.removeEventListener("change", onMediaChange);
        };
    });

    function setTheme(value: Theme) {
        theme = value;
        localStorage.setItem(LOCAL_STORAGE_KEY, value);
    }

    return {
        get theme() {
            return theme;
        },
        get displayedTheme() {
            return displayedTheme;
        },
        setTheme,
    };
}
