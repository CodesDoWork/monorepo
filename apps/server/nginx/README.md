# Reverse Proxy

[Nginx](https://www.nginx.com/) is used for the reverse proxy.
See its docs [here](https://docs.nginx.com).

It connects all services and authenticates requests for services without oidc authentication.
Whenever you access the server, this proxy will be the first connection.

The only two exceptions to this are the [`Fritz!Box`](https://just-fritz.konratts.de)
and [`SSH`](ssh://ssh.konratts.de) access.
While you can access both services locally using [fritz.box](https://fritz.box)
and [server.fritz.box](ssh://server.fritz.box),
these routes are configured via cloudflare for external availability.
