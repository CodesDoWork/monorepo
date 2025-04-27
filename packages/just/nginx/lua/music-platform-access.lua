local auth = require "auth"
local username_header = os.getenv("MUSIC_PLATFORM_AUTH_USERNAME_HEADER")

res = auth.authenticate()
ngx.req.set_header(username_header, res.id_token.preferred_username)
