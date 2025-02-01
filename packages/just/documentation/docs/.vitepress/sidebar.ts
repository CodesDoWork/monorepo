import { readdirSync } from "node:fs";
import path from "node:path";

export type SidebarItem = SidebarDir | SidebarFile;

type SidebarDir = {
    text: string;
    collapsible: boolean;
    collapsed: boolean;
    items: SidebarItem[];
};

type SidebarFile = {
    text: string;
    link: string;
};

export type Sidebar = SidebarItem[];

export function generateSidebar(docsPath: string): Sidebar {
    const skipLevels = 4;
    const levelThreshold = 4;
    function processDirectory(dirPath: string, rootItem: SidebarDir, level = 0): SidebarDir {
        const isBelowThreshold = level < levelThreshold;

        const children = readdirSync(dirPath, { withFileTypes: true });
        const dirItem: SidebarDir = {
            text: isBelowThreshold
                ? dirPath.split(path.sep)?.pop() || path.dirname(dirPath)
                : dirPath.split(path.sep).slice(skipLevels).join("-"),
            collapsible: true,
            collapsed: true,
            items: [],
        };
        const isCodeDocs = dirItem.text === "code-docs";

        for (const child of children) {
            if (child.isDirectory() && !isCodeDocs) {
                processDirectory(
                    path.join(dirPath, child.name),
                    isBelowThreshold ? dirItem : rootItem,
                    level + 1,
                );
            } else if (child.name.endsWith(".md") && (!isCodeDocs || child.name === "modules.md")) {
                const childPath = path.join(dirPath, child.name);
                const fileName = path.parse(child.name).name;
                dirItem.items.push({
                    text: fileName,
                    link: path.relative(docsPath, childPath).replaceAll(path.sep, "/"),
                });
            }
        }

        if (dirItem.items.length) {
            rootItem.items.push(dirItem);
        }

        return dirItem;
    }

    const rootItem: SidebarDir = { text: "", collapsible: true, collapsed: true, items: [] };
    const docsDir = processDirectory(docsPath, rootItem);

    return docsDir.items.filter(item => !["index", "about"].includes(item.text));
}
