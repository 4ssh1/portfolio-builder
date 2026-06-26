
ARG NODE_VERSION=22.20.0

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
EXPOSE 3000

# DEVELOPMENT STAGE
FROM base AS development
# Install ALL dependencies (including devDependencies for nodemon)
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Run as non-root user [cite: 8]
USER node

# Copy source code
COPY . .

# In dev, we run the dev script (nodemon)
CMD ["npm", "run", "dev"]

# PRODUCTION STAGE
FROM base AS production
# Set production environment
ENV NODE_ENV production

# Only install production dependencies 
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev 

# Run as non-root user 
USER node 

# Copy source code
COPY . .

# In prod, we run the standard start script (node app.js) 
CMD ["npm", "start"]