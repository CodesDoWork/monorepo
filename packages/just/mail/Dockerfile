ARG IMAGE_BASE
ARG PROJECT_VERSION
ARG DOCKER_PROXY

ARG APP_NAME=just-mail
ARG APP_DIR=just/mail


ARG DOCKER_DEBIAN_VERSION=12.13-slim
FROM ${DOCKER_PROXY}debian:${DOCKER_DEBIAN_VERSION}
ARG APP_DIR

# install docker
RUN apt-get update && \
    apt-get install -y ca-certificates curl openssl && \
    install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc && \
    chmod a+r /etc/apt/keyrings/docker.asc && \
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
    $(. /etc/os-release && echo "${VERSION_CODENAME}") stable" | \
    tee /etc/apt/sources.list.d/docker.list > /dev/null && \
    apt-get update && \
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# mandatory dependencies
RUN apt-get install -y jq

COPY --chmod=555 packages/${APP_DIR}/entrypoint.sh /
COPY --chmod=555 packages/${APP_DIR}/cp_certs.sh /
ARG GITHUB_MAILCOW__MAILCOW_DOCKERIZED__DATED_VERSION=2026-01
RUN git clone https://github.com/mailcow/mailcow-dockerized --branch ${GITHUB_MAILCOW_MAILCOW_DOCKERIZED_VERSION} /opt/${APP_DIR}

WORKDIR /opt/${APP_DIR}
RUN cp -r data/assets/ssl-example/ data/assets/ssl/

SHELL ["/bin/bash"]
ENTRYPOINT ["/entrypoint.sh"]
