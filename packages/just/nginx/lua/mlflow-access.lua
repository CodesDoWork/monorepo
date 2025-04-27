local auth = require "auth"
local mlflow_api_key = os.getenv("MLFLOW_API_KEY")

local api_key_header = ngx.req.get_headers()["MLFLOW-API-KEY"]
if api_key_header ~= mlflow_api_key then
    auth.authenticate()
end
