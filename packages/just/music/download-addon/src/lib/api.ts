const API_BASE = import.meta.env.VITE_API_URL;
const ENDPOINTS = {
    download: `${API_BASE}/download`,
    status: (id: string) => `${API_BASE}/download/status/${id}`,
};

interface DownloadResponse {
    downloadId: string;
}

export function getEventsStream(id: string): EventSource {
    return new EventSource(ENDPOINTS.status(id));
}

export async function startDownload(url: string, cookies: string): Promise<string> {
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
}

export async function checkStreamHealth(id: string): Promise<Response> {
    return fetch(ENDPOINTS.status(id), { method: "GET" });
}
