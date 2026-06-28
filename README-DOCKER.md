# portfolio-builder Docker Guide

This guide explains how to run the portfolio-builder backend and database using Docker. We use a multi-stage build to separate the development and production environments. 

**Prerequisites**
You need to have Docker Desktop or the Docker Engine installed and running on your machine before starting. 

**Development Environment**
The development setup runs the Node.js application using nodemon for automatic reloads and spins up a local MongoDB instance. 

Create a `.env.dev` file in the root of the project. Ensure your database connection string points to the internal Docker network. For example: `DATABASE_URL="mongodb://mongodb-local:27017/portfolio_dev"`. 

To start the development environment, make sure your bash scripts have execution permissions, then run the dev script. You can do this via npm:
`npm run dev:docker`

Once the health checks pass, the portfolio-builder API will be available at `http://localhost:3000`. If you need to view the database visually using MongoDB Compass, connect to `mongodb://localhost:2701`.

**Production Environment**
The production setup runs an optimized, lightweight Node image without development dependencies. 

Create a standard `.env` file in the root of the project with your production variables. If you are using a cloud database like MongoDB Atlas, ensure your connection string is updated here.

To build and start the production environment, run:
`npm run prod:docker`

**Stopping the Services**
The startup scripts automatically clean up old containers before running. If you want to manually stop everything and free up your ports, use the down command for your specific environment:
`docker compose -f docker-compose.dev.yml down`