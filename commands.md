# gcloud commands

## Compute engine commands

```
gcloud config set compute/zone us-central1-b
```
Create vm
```
gcloud compute instances create "frontend-app-vm" --machine-type "n1-standard-1"
```

Autorizar docker en la vm

```
gcloud auth configure-docker

AMD
VERSION=2.1.5
OS=linux  # or "darwin" for OSX, "windows" for Windows.
ARCH=amd64
curl -fsSL "https://github.com/GoogleCloudPlatform/docker-credential-gcr/releases/download/v${VERSION}/docker-credential-gcr_${OS}_${ARCH}-${VERSION}.tar.gz" \
| tar xz docker-credential-gcr \
&& chmod +x docker-credential-gcr && sudo mv docker-credential-gcr /usr/bin/

ARM
VERSION=2.1.5
OS=linux  # or "darwin" for OSX, "windows" for Windows.
ARCH=arm64

curl -fsSL "https://github.com/GoogleCloudPlatform/docker-credential-gcr/releases/download/v${VERSION}/docker-credential-gcr_${OS}_${ARCH}-${VERSION}.tar.gz" \
| tar xz docker-credential-gcr \
&& chmod +x docker-credential-gcr && sudo mv docker-credential-gcr /usr/bin/

sudo docker-credential-gcr configure-docker
```

Create cluster on google kubernetes engine
```
gcloud container clusters create gke-api-v1 --machine-type=e2-medium --region us-central1 --num-nodes=1
```
Deploy to google cloud function
```
gcloud functions deploy api-user-profile --entry-point initialApp --runtime nodejs16 --trigger-http --project gcp-fundamentals-372116
```

App Engine
```
gcloud app create --region=us-central
```
```
gcloud app deploy clientAppEngine.yaml
```

Kubernetes:
```
kubectl get pods 
kubectl get services 
kubectl apply -f k8s/backend.yaml 
```

Build backend image
```
docker build -t backend-amd:latest --platform linux/amd64 .
```

Backend development purposes: 
```
   docker run \
    -v $(pwd)/backend:/code \
    -e APP_PORT=9000 \
    -e DB_NAME=gcp-db \
    -e DB_USER=postgres \
    -e DB_PASSWORD=mypass \
    -e DB_HOST=34.29.27.64 \
    -e DB_PORT=5432 \
    -w /code \
    -p 9000:9000 \
    --rm -it node:16-buster "/bin/bash"
```

Build and run frontend 
```
docker build -t frontend-amd:latest --platform linux/amd64 .
docker compose up --build --force-recreate
```

Container registry:
```
docker tag backend-amd:latest gcr.io/gcp-fundamentals-372116/backend-amd:latest
docker push gcr.io/gcp-fundamentals-372116/backend-amd:latest 

docker tag frontend-amd:latest gcr.io/gcp-fundamentals-372116/frontend-amd:latest
docker push gcr.io/gcp-fundamentals-372116/frontend-amd:latest 
```


