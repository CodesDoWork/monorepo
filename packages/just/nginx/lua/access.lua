local domain = os.getenv("KEYCLOAK_DOMAIN")
local realm = os.getenv("KEYCLOAK_REALM")

local client_id = os.getenv("NGINX_AUTH_CLIENT_ID")
local client_secret = os.getenv("NGINX_AUTH_CLIENT_SECRET")

local opts = {
    redirect_uri = "/callback-auth",
    accept_none_alg = true,
    discovery = "https://" .. domain .. "/realms/" .. realm .. "/.well-known/openid-configuration",
    client_id = client_id,
    client_secret = client_secret,
    logout_path = "/callback-logout",
    session_contents = { id_token = true },
    ssl_verify = "yes"
}

local res, err, url, session = require("resty.openidc").authenticate(opts)
if err then
    ngx.status = 403
    ngx.say(err)
    ngx.exit(ngx.HTTP_FORBIDDEN)
end

return res
