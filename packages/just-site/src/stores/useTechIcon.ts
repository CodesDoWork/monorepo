import { iconExists, loadIcon } from "@iconify/svelte";
import { readable } from "svelte/store";

const iconSuites = ["devicon", "skill-icons", "logos", "mdi", "simple-icons"];

export function useTechIcon(technology: string) {
    const iconName = technology.replace("#", "sharp").replace(/[. ]/g, "").toLowerCase();
    return readable(undefined, set => {
        getIcon(iconName).then(set);
    });
}

async function getIcon(iconName: string) {
    let suiteIdx = 0;
    let icon: string;
    do {
        icon = `${iconSuites[suiteIdx++]}:${iconName}`;
        await loadIcon(icon).catch(() => {
            /* some random error */
        });
    } while (!iconExists(icon) && suiteIdx < iconSuites.length);

    return icon;
}
