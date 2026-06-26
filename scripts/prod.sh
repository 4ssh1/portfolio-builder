#!/bin/bash

echo "Starting Portfolio-builder production environment..."

# check if .env exists
if [ ! -f .env ]; then
    echo "Error: .env file not found in the root directory."
    exit 1
fi

# check if docker is running
if ! docker info >/dev/null 2>&1; then
    echo "Error: Docker is not running. Please start Docker first."
    exit 1
fi

echo "Docker is running. Cleaning up old containers..."
# Spin down any existing containers from this compose file
docker compose -f docker-compose.prod.yml down

echo "Building and starting services..."

docker compose -f docker-compose.prod.yml up --build

echo "Production environment started"
echo "Application is live at http://localhost:3000"
echo "Db is running at mongodb://localhost:2701"

echo "Portfolio-builder services are up! Attaching to logs..."

# Follow the logs (Ctrl+C will exit the logs but leave containers running)
docker compose -f docker-compose.prod.yml logs -f