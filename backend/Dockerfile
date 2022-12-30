# docker build -t backend-amd:latest --platform linux/amd64 .
# docker build -t backend-local:latest  .
#  docker run -p 9001:9001 backend-local

FROM node:16-alpine

ENV APP_PORT=9001 \
    JWT_PRIVATE_KEY=amyad-p2!=!=vate_.jsonwebtoken___@@$AA+%!!@!!!! \
    GOOGLE_APPLICATION_CREDENTIALS=../gcp-fundamentals-372116-b914cd7ab424.json \
    DB_NAME=gcp-db \
    DB_USER=postgres \
    DB_PASSWORD=mypass \
    DB_HOST=34.29.27.64 \
    DB_PORT=5432 

COPY . /app

WORKDIR /app

RUN yarn install

CMD [ "yarn", "start" ]