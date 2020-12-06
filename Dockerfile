FROM node:12-alpine AS base
WORKDIR /app

FROM base AS dependencies
COPY package*.json ./
RUN npm ci install && npm cache clean --force

FROM dependencies AS build
WORKDIR app
COPY src /app
RUN npm run build

FROM base AS prod_dependencies
RUN apk update && apk add \
    curl \
    bash \
    && rm -rf /var/cache/apk/*
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin
WORKDIR /app
COPY package*.json ./
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build
RUN npm prune --production
RUN /usr/local/bin/node-prune

FROM node:12-alpine AS release
WORKDIR /app
COPY --from=prod_dependencies /app/dist ./dist
COPY --from=prod_dependencies /app/node_modules ./node_modules
USER node
EXPOSE 4000
CMD ["node", "./dist/main.js"]