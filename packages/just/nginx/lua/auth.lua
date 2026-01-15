local jwt = require "resty.jwt"

local M = {}

local function has_role(res, role, client)
    if not res or not res.access_token then
        return false
    end

    local token = jwt:load_jwt(res.access_token).payload
    if token.resource_access and token.resource_access[client] and token.resource_access[client].roles then
        for _, r in ipairs(token.resource_access[client].roles) do
            if r == role then return true end
        end
    end

    return false
end


function M.authenticate()
    local domain = os.getenv("KEYCLOAK_DOMAIN")
    local realm = os.getenv("KEYCLOAK_REALM")

    local client_id = os.getenv("NGINX_AUTH_CLIENT_ID")
    local client_secret = os.getenv("NGINX_AUTH_CLIENT_SECRET")

    local opts = {
        redirect_uri = "/callback-auth",
        discovery = "https://" .. domain .. "/realms/" .. realm .. "/.well-known/openid-configuration",
        client_id = client_id,
        client_secret = client_secret,
        logout_path = "/callback-logout",
        session_contents = { id_token = true, access_token = true },
        scope = "openid email profile roles music-lib",
        ssl_verify = "no"
    }

    local session_opts = {
        secret = os.getenv("NGINX_AUTH_SESSION_SECRET"),
        cookie_prefix = "nginx_auth_",
        cookie_http_only = true,
        cookie_secure = true,
        cookie_same_site = "Lax",
        remember = true
    }

    local res, err = require("resty.openidc").authenticate(opts, nil, nil, session_opts)
    if err then
        ngx.status = 403
        ngx.say(err)
        ngx.exit(ngx.HTTP_FORBIDDEN)
    end

    role = ngx.var.required_role
    if role and role ~= "" and not has_role(res, role, client_id) then
        ngx.status = 403
        ngx.say("Forbidden: missing required group: " .. role)
        return ngx.exit(ngx.HTTP_FORBIDDEN)
    end

    return res
end

return M 
