export default {
    async fetch(request, env, ctx) {
        if (!request.headers.has("authorization")) {
            return getUnauthorizedResponse("Provide Username and Password to access this page.");
        }

        const { username, password } = parseCredentials(request.headers.get("authorization"));
        if (username !== env.USERNAME || password !== env.PASSWORD) {
            return getUnauthorizedResponse("Invalid Credentials");
        }

        return await fetch(request);
    },
};

function parseCredentials(authorization) {
    const parts = authorization.split(" ");
    const plainAuth = atob(parts[1]);
    const credentials = plainAuth.split(":");
    return { username: credentials[0], password: credentials[1] };
}

function getUnauthorizedResponse(message) {
    const response = new Response(message, { status: 401 });
    response.headers.set("WWW-Authenticate", `Basic realm="Test Website"`);
    return response;
}
