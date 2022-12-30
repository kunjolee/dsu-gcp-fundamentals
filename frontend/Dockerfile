# docker build -t frontend-local:latest .
# docker build -t frontend-amd:latest --platform linux/amd64 .

FROM node:16-alpine as builder

ENV VITE_API_URL=http://34.72.244.85:9500 \
    VITE_CLOUD_FUNCTION_API=https://us-central1-gcp-fundamentals-372116.cloudfunctions.net/api-user-profile

WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:1.21.3-alpine 
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]