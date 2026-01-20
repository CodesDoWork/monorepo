import browser from "webextension-polyfill";

// --- Configuration & Constants ---
const API_BASE = "http://localhost:4200/api";
const ENDPOINTS = {
    download: `${API_BASE}/download`,
    status: (id: string) => `${API_BASE}/download/status/${id}`,
};

// --- Types ---
interface DownloadResponse {
    downloadId: string;
}

interface StatusUpdate {
    status: "processing" | "completed" | "failed";
    message?: string;
}

// --- Logic Modules ---

/** Handles all communication with the backend */
const ApiClient = {
    async startDownload(url: string, cookies: string): Promise<string> {
        const response = await fetch(ENDPOINTS.download, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, cookies }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data: DownloadResponse = await response.json();
        return data.downloadId;
    },

    async checkStreamHealth(id: string): Promise<Response> {
        return fetch(ENDPOINTS.status(id), { method: "GET" });
    },
};

/** Handles Netscape cookie formatting */
const CookieService = {
    async getYoutubeCookiesAsNetscape(): Promise<string> {
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
    },
};

/** Manages UI state and DOM updates */
class DownloadUI {
    private urlInput = document.getElementById("urlInput") as HTMLInputElement;
    private btn = document.getElementById("downloadBtn") as HTMLButtonElement;
    private statusLabel = document.getElementById("status") as HTMLDivElement;
    private logContent = document.getElementById("logContent") as HTMLDivElement;
    private logContainer = document.getElementById("logContainer") as HTMLDivElement;
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
            return this.updateStatus("Missing URL", true);
        }

        try {
            this.clearLogs();
            this.updateStatus("Extracting session...");
            const cookies = await CookieService.getYoutubeCookiesAsNetscape();

            this.updateStatus("Starting download...");
            const downloadId = await ApiClient.startDownload(url, cookies);

            this.connectToStream(downloadId);
        } catch (err) {
            this.updateStatus(err instanceof Error ? err.message : "Request failed", true);
        }
    }

    connectToStream(id: string) {
        this.closeStream();
        browser.storage.local.set({ activeDownloadId: id });

        this.eventSource = new EventSource(ENDPOINTS.status(id));

        this.eventSource.onmessage = event => {
            try {
                const data: StatusUpdate = JSON.parse(event.data);
                this.appendLog(data.message || event.data);

                if (data.status === "completed" || data.status === "failed") {
                    this.terminateSession(
                        data.status === "completed" ? "Done!" : "Download failed",
                        data.status === "failed",
                    );
                }
            } catch {
                this.appendLog(event.data);
            }
        };

        this.eventSource.onerror = async () => {
            try {
                const res = await ApiClient.checkStreamHealth(id);
                if (res.status === 404) {
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
        this.closeStream();
        browser.storage.local.remove("activeDownloadId");
        this.updateStatus(message, isError);
    }
}

// --- Initialization ---
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
