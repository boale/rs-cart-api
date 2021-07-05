FROM node:lts-alpine as base

WORKDIR app

# dependencies install
COPY package*.json ./
RUN npm install && npm cache clean --force

# app build
COPY . .
RUN npm run build

# application image
FROM alpine:latest as app
RUN apk add --update --no-cache nodejs npm

WORKDIR app

COPY --from=base app/package.json ./
RUN npm install --only=production && npm cache clean --force
COPY --from=base app/dist ./dist/

EXPOSE 4000
ENTRYPOINT ["node", "dist/main.js"]