FROM python:3.10-slim

RUN pip install mlflow==2.21.3 psycopg2-binary==2.9.10

CMD ["bash"]
ENTRYPOINT [ "mlflow", "server" ]
