# Base
FROM node:14-alpine AS base

WORKDIR /app
# Dependencies
COPY package*.json ./
RUN npm install && npm cache clean --force 

# Build
WORKDIR /app
COPY . .
RUN npm run build

# Application
FROM node:14-alpine AS application

COPY --from=base /app/package*.json ./
RUN npm install --only=production
COPY --from=base /app/dist ./dist

USER node
ENV PORT=4000
EXPOSE 4000

ENTRYPOINT [ "node", "dist/main.js" ]
