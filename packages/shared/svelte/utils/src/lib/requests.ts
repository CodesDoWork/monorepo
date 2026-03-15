export function hasAccept(request: Request): boolean {
    return request.headers.has("accept") && request.headers.get("accept") !== "*/*";
}

export function isJsonRequest(request: Request): boolean {
    return hasAccept(request) && request.headers.get("accept") === "application/json";
}
