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
    function processDirectory(dirPath: string, rootItem: SidebarDir, level = 0): SidebarDir {
        console.log(dirPath);
        const children = readdirSync(dirPath, { withFileTypes: true });
        const dirItem: SidebarDir = {
            text: dirPath.split(path.sep)?.pop() || path.dirname(dirPath),
            collapsible: true,
            collapsed: true,
            items: [],
        };

        for (const child of children) {
            if (child.isDirectory()) {
                processDirectory(path.join(dirPath, child.name), dirItem, level + 1);
            } else if (child.name.endsWith(".md")) {
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
