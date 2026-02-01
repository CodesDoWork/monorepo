import browser from "webextension-polyfill";
import { DownloadUI } from "./lib/ui";

async function init() {
    const ui = new DownloadUI();

    // Resume existing session
    const { activeDownloadId } = await browser.storage.local.get("activeDownloadId");
    if (activeDownloadId && typeof activeDownloadId === "string") {
        ui.updateStatus("Resuming status...");
        ui.connectToStream(activeDownloadId);
    }

    // Auto-fill active tab
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    if (tab?.url?.includes("youtube.com")) {
        ui.setURL(tab.url);
    }
}

init();
