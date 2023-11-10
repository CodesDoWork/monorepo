local domain = os.getenv("DOMAIN")
local realm = os.getenv("AUTH_REALM")

local client_id = os.getenv("NGINX_AUTH_CLIENT_ID")
local client_secret = os.getenv("NGINX_AUTH_CLIENT_SECRET")

local username_header = os.getenv("NGINX_AUTH_USERNAME_HEADER")

local opts = {
    redirect_uri_path = "/callback-auth",
    accept_none_alg = true,
    discovery = "https://" .. domain .. "/auth/realms/" .. realm .. "/.well-known/openid-configuration",
    client_id = client_id,
    client_secret = client_secret,
    logout_path = "/logout",
    redirect_after_logout_uri = "https://" .. domain .. "/auth/realms/" .. realm .. "/protocol/openid-connect/logout",
    session_contents = { id_token = true },
    ssl_verify = "no"
}

local res, err, url, session = require("resty.openidc").authenticate(opts)
if err then
    ngx.status = 403
    ngx.say(err)
    ngx.exit(ngx.HTTP_FORBIDDEN)
end

ngx.req.set_header(username_header, res.id_token.preferred_username)
