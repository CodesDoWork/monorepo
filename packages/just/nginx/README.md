# just-nginx

[Nginx](https://www.nginx.com/) is used for the reverse proxy.
See its docs [here](https://docs.nginx.com).

It connects all services and authenticates requests for services without oidc authentication.
It also supports internal and external routes by identifying whether requests came from the tunnel or from other
services.
Whenever you access the server, this proxy will be the first connection.
