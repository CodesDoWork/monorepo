# shared-nginx

This package provides a preconfigured nginx container with automatic configuation by docker labels
(see [shared-nginx-configurator](./configurator/)).

## Environment variables

- Those from [shared-nginx-configurator](./configurator/README.md)
- `KEYCLOAK_DOMAIN`
- `KEYCLOAK_REALM`
- `NGINX_AUTH_CLIENT_ID`
- `NGINX_AUTH_CLIENT_SECRET`
- `NGINX_AUTH_SESSION_SECRET`
