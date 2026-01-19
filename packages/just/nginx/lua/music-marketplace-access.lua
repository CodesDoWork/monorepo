local auth = require "auth"

res = auth.authenticate()
ngx.req.set_header("X-Music-Lib", res.id_token.musicLib)
