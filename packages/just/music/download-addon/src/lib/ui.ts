import { HttpStatusCode } from "@cdw/monorepo/shared-utils/http-status-codes";
import browser from "webextension-polyfill";
import { checkStreamHealth, getEventsStream, startDownload } from "./api";
import { getYoutubeCookiesAsNetscape } from "./cookies";

export class DownloadUI {
    private readonly urlInput = document.getElementById("urlInput") as HTMLInputElement;
    private readonly btn = document.getElementById("downloadBtn") as HTMLButtonElement;
    private readonly statusLabel = document.getElementById("status") as HTMLDivElement;
    private readonly logContent = document.getElementById("logContent") as HTMLDivElement;
    private readonly logContainer = document.getElementById("logContainer") as HTMLDivElement;
    private eventSource: EventSource | null = null;

    constructor() {
        this.btn.addEventListener("click", () => this.handleDownloadClick());
    }

    setURL(url: string) {
        this.urlInput.value = url;
    }

    updateStatus(msg: string, isError = false) {
        this.statusLabel.textContent = msg;
        this.statusLabel.className = `text-xs text-center ${isError ? "text-red-500" : "text-blue-500"}`;
    }

    appendLog(message: string) {
        const div = document.createElement("div");
        div.textContent = `> ${message}`;
        this.logContent.appendChild(div);
        this.logContainer.scrollTop = this.logContainer.scrollHeight;
    }

    clearLogs() {
        this.logContent.innerHTML = "";
    }

    private async handleDownloadClick() {
        const url = this.urlInput.value;
        if (!url) {
            this.updateStatus("Missing URL", true);
            return;
        }

        try {
            this.clearLogs();
            this.updateStatus("Extracting session...");
            const cookies = await getYoutubeCookiesAsNetscape();

            this.updateStatus("Starting download...");
            const downloadId = await startDownload(url, cookies);

            this.connectToStream(downloadId);
        } catch (err) {
            this.updateStatus(err instanceof Error ? err.message : "Request failed", true);
        }
    }

    connectToStream(id: string) {
        this.closeStream();
        browser.storage.local.set({ activeDownloadId: id });

        this.eventSource = getEventsStream(id);

        this.eventSource.onmessage = event => {
            this.appendLog(event.data);
        };

        this.eventSource.onerror = async () => {
            if (this.eventSource?.CLOSED === 2) {
                this.terminateSession("Download finished");
                return;
            }

            try {
                const res = await checkStreamHealth(id);
                if (res.status === HttpStatusCode.NOT_FOUND) {
                    this.terminateSession("Session not found (404)", true);
                } else if (!res.ok) {
                    this.terminateSession(`Stream error: ${res.status}`, true);
                }
            } catch {
                this.terminateSession("Server unreachable", true);
            }
        };
    }

    private closeStream() {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
    }

    private terminateSession(message: string, isError = false) {
        browser.storage.local.remove("activeDownloadId");
        this.updateStatus(message, isError);
        this.closeStream();
    }
}
