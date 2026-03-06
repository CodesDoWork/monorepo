ARG DOCKER_PROXY


ARG DOCKER_PYTHON_VERSION=3.14.3-slim
FROM ${DOCKER_PROXY}python:${DOCKER_PYTHON_VERSION}
ARG APP_DIR=shared/mlflow

RUN apt update && apt install -y wget && rm -rf /var/lib/apt/lists/*
COPY packages/${APP_DIR}/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

ENTRYPOINT ["mlflow", "server"]
