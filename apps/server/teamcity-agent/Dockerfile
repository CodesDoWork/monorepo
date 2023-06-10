FROM codesdowork/monorepo-private/base AS base
FROM codesdowork/monorepo-private/workspace AS workspace


FROM jetbrains/teamcity-agent:2022.10-linux-sudo

RUN curl -sL https://deb.nodesource.com/setup_19.x -o /tmp/nodesource_setup.sh
RUN sudo bash /tmp/nodesource_setup.sh
RUN sudo apt-get install -y nodejs

USER root
ARG DOCKER_REGISTRY_HOST
COPY --from=workspace /app/libs/server/ssl/certs/localhost.crt /etc/docker/certs.d/$DOCKER_REGISTRY_HOST/ca.crt

USER buildagent
