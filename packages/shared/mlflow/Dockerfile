FROM python:3.12.12-slim

RUN pip install mlflow==3.8.1 psycopg2-binary==2.9.10

SHELL ["bash"]
ENTRYPOINT [ "mlflow", "server" ]
