#!/bin/bash

# Configuration
CONFIG_FILE="dab-config.json"
IMAGE="mcr.microsoft.com/azure-databases/data-api-builder"
PORT=5000

# Vérification du fichier de config
if [ ! -f "$CONFIG_FILE" ]; then
  echo "❌ Fichier $CONFIG_FILE introuvable."
  exit 1
fi

# Lancement de DAB dans un conteneur Docker
echo "🚀 Lancement de Data API Builder..."
docker run --platform linux/amd64 \
  -v $(pwd)/$CONFIG_FILE:/App/dab-config.json \
  -e ASPNETCORE_URLS=http://+:$PORT \
  -e ASPNETCORE_FORWARDEDHEADERS_ENABLED=false \
  -p $PORT:$PORT \
  $IMAGE
