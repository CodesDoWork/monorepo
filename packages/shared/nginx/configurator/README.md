# shared-nginx-configurator

Simple Go application that monitors docker container labels and generates a nginx configuration from
them.

## Usage

### Environment variables

| Name               | Default                        | Description                           |
| ------------------ | ------------------------------ | ------------------------------------- |
| CONFIG_PATH        | /etc/nginx/conf.d/default.conf | Path to nginx config file to write to |
| EXTERNAL_IPS       |                                | Comma separated list of external ips  |
| INTERNAL_IP_PREFIX |                                | Internal ip prefix, e.g. 192.168.1.   |
| DOCKER_STACK       |                                | Docker stack name                     |
| DOMAIN             |                                | Domain for `server_name`              |

### Labels

### General Labels

- `nginx.proto` (for proxy pass, defaults to http)
- `nginx.host` (for proxy pass, default to container name)
- `nginx.port` (for proxy pass, defaults to 80)
- `nginx.luaAccessFile` (for lua access, defaults to `/etc/nginx/lua/access.lua`)

### Config Labels

These can be used either for the server directive using `nginx.<label>` or for the location
directive via `nginx.location.<location>.<label>` where location is the location path like `/`.

- `.domain` [server] (sets the `server_name`, defaults to service or container name as subdomain)
- `.isInternal` [server|location] (evaluates whether requesting IP is private via
  `INTERNAL_IP_PREFIX` and `EXTERNAL_IPS`)
- `.requiredRole` [server|location] (evaluates whether the requester has a specific role)
- `.useLuaAccess` [server|location] (uses the `nginx.luaAccessFile` for access)
- `.maxBodySize` [server|location] (sets the `client_max_body_size`)
- `.proxyHeaders.<header>` [server|location] (sets the `proxy_set_header`)
- `.proxyBuffering` [server|location] (sets the `proxy_buffering`)
- `.gzip` [server|location] (sets the `gzip`)

### Location Labels

The location `/` is added by default if not set.

- `nginx.location.<location>.pass` (sets the `proxy_pass`, a pass is added by default)

### Server Labels

By default, all labels are applied to the `default` server (`nginx.server.default`). When there is
the need to add a new server, a new server block can be added with the `nginx.server.<server>`
prefix.
