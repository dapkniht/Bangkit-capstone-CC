FROM python:3.9-slim

WORKDIR /usr/src/app

COPY ./ml-service/requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY ./ml-service/ ./

CMD [ "python", "app.py" ]
