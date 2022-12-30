docker build -t backend-amd:latest --platform linux/amd64 .
docker tag backend-amd:latest gcr.io/gcp-fundamentals-372116/backend-amd:latest
docker push gcr.io/gcp-fundamentals-372116/backend-amd:latest    
