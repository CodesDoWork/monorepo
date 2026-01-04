FROM python:3.14.2-slim

RUN pip install --no-cache-dir mlflow==3.8.1 psycopg2-binary==2.9.11

SHELL ["bash"]
ENTRYPOINT [ "mlflow", "server" ]
