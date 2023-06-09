# Reverse Proxy

<a href="https://www.nginx.com/" target="_blank" rel="noopener noreferrer">Nginx</a> is used for
the reverse proxy.
See its docs <a href="https://docs.nginx.com/" target="_blank" rel="noopener noreferrer">here</a>.

It connects all services and authenticates requests. Whenever you access the server, this proxy
will be the first connection.

## Structure

The `reverse-proxy` directory contains a Dockerfile for a rootless nginx container and an nginx
config template file.

## Authentication

Coming soon!
