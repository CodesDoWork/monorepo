interface Env {
    USERNAME: string;
    PASSWORD: string;
}

export default {
    async fetch(request, env): Promise<Response> {
        const auth = request.headers.get("authorization");
        if (!auth) {
            return getUnauthorizedResponse("Provide Username and Password to access this page.");
        }

        const { username, password } = parseCredentials(auth);
        if (username !== env.USERNAME || password !== env.PASSWORD) {
            return getUnauthorizedResponse("Invalid Credentials");
        }

        return await fetch(request);
    },
} satisfies ExportedHandler<Env>;

function parseCredentials(authorization: string) {
    const parts = authorization.split(" "); // Basic + base64
    const credentials = atob(parts[1] as string).split(":");
    return { username: credentials[0], password: credentials[1] };
}

function getUnauthorizedResponse(message: string) {
    const response = new Response(message, { status: 401 });
    response.headers.set("WWW-Authenticate", `Basic realm="Test Website"`);
    return response;
}
