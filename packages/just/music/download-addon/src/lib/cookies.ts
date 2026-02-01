import browser from "webextension-polyfill";

export async function getYoutubeCookiesAsNetscape(): Promise<string> {
    const cookies = await browser.cookies.getAll({ domain: "youtube.com" });
    const header = "# Netscape HTTP Cookie File\n\n";
    const rows = cookies.map(c =>
        [
            c.domain,
            c.domain.startsWith(".") ? "TRUE" : "FALSE",
            c.path,
            c.secure ? "TRUE" : "FALSE",
            c.expirationDate ? Math.floor(c.expirationDate) : 0,
            c.name,
            c.value,
        ].join("\t"),
    );
    return header + rows.join("\n");
}
