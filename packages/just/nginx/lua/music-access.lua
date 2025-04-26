local username_header = os.getenv("NGINX_AUTH_USERNAME_HEADER")

res = dofile("/etc/nginx/lua/access.lua")
ngx.req.set_header(username_header, res.id_token.preferred_username)
