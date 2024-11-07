import { getSidebar } from "vitepress-plugin-auto-sidebar";
import { withMermaid } from "vitepress-plugin-mermaid";

let sidebar = getSidebar({
    contentRoot: "./docs",
    contentDirs: ["."],
    collapsible: true,
    collapsed: true,
});

function flattenItems(item, path = "", level = 0) {
    item.text = path ? `${path}-${item.text}` : item.text;
    if (!item.items || item.items.every(subItem => !subItem.items)) {
        return item;
    }

    const itemsToFlat = item.items.filter(
        subItem => !!subItem.items && subItem.items.some(subSubItem => !!subSubItem.items),
    );
    item.items = item.items
        .filter(subItem => !subItem.items || subItem.items.every(subSubItem => !subSubItem.items))
        .map(subItem => flattenItems(subItem, level > 0 ? item.text : "", level + 1));

    item.items.push(
        ...itemsToFlat.flatMap(
            subItem => flattenItems(subItem, level > 0 ? item.text : "", level + 1).items,
        ),
    );

    return item;
}

sidebar = sidebar[0].items.filter(item => !/About|Index/.test(item.text));
sidebar
    .find(item => item.text === "Projects")
    ?.items.forEach(project => project.items.forEach(subItem => flattenItems(subItem)));

sidebar
    .find(item => item.text === "Projects")
    ?.items?.forEach(project => {
        const codeDocs = project.items.find(subItem => subItem.text === "Code docs");
        codeDocs.items = codeDocs.items.filter(subItem => subItem.text === "Modules");
        project.items.forEach(subItem => flattenItems(subItem));
    });

const logoSvg = `<svg viewBox="0 0 210 97" xmlns="http://www.w3.org/2000/svg">
    <defs id="SvgjsDefs2368">
        <linearGradient id="SvgjsLinearGradient2375">
            <stop id="SvgjsStop2376" stop-color="#2d388a" offset="0"></stop>
            <stop id="SvgjsStop2377" stop-color="#00aeef" offset="1"></stop>
        </linearGradient>
    </defs>
    <g id="SvgjsG2369"
       transform="matrix(0.382666677236557,0,0,0.382666677236557,6.787333333333333,-49.855728068033855)"
       fill="url(#SvgjsLinearGradient2375)">
        <g xmlns="http://www.w3.org/2000/svg">
            <polygon points="121.6,256.1 170.1,207.7 143.5,181.1 68.5,256.1 122.5,310.1 148.9,283.4"></polygon>
            <polygon points="389.5,202.1 363.1,228.7 390.4,256.1 342.1,304.6 368.5,331.1 443.5,256.1"></polygon>
            <rect x="96.9"
                  y="237.3"
                  transform="matrix(0.7071 -0.7071 0.7071 0.7071 -106.0356 256.0074)"
                  width="318.2"
                  height="37.5"></rect>
        </g>
    </g>
</svg>
`;

export default withMermaid({
    title: "Server Docs",
    lang: "en-US",
    outDir: "../../../../dist/packages/just/documentation",
    lastUpdated: true,
    ignoreDeadLinks: true,
    head: [["link", { rel: "shortcut icon", href: "/favicon.ico" }]],
    themeConfig: {
        siteTitle: "Server Docs",
        logo: "/icon.svg",
        nav: [
            {
                text: "About",
                link: "/about",
            },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/CodesDoWork" },
            { icon: "instagram", link: "https://instagram.com/justinkonratt" },
            { icon: { svg: logoSvg }, link: "https://justinkonratt.com" },
        ],
        sidebar,
        outline: [2, 3],
        footer: {
            copyright: "Copyright © 2023-present Justin Konratt",
        },
    },
    mermaid: {},
});
