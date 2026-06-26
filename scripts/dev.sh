#!/bin/bash

echo "Starting Portfolio-builder development environment..."

# check if .env.dev exists
if [ ! -f .env.dev ]; then
    echo "Error: .env.dev file not found in the root directory."
    exit 1
fi

# check if docker is running
if ! docker info >/dev/null 2>&1; then
    echo "Error: Docker is not running. Please start Docker first."
    exit 1
fi

echo "Docker is running. Cleaning up old containers..."
# Spin down any existing containers from this compose file
docker compose -f docker-compose.dev.yml down

echo "Building and starting services..."
# Build the images and start containers
docker compose -f docker-compose.dev.yml up --build

echo "Portfolio builder services are up! Attaching to logs..."

echo "Development environment started"
echo "Application is live at http://localhost:3000"
echo "Db is running at mongodb://localhost:2701"


# Follow the logs (Ctrl+C will exit the logs but leave containers running)
docker compose -f docker-compose.dev.yml logs -f
