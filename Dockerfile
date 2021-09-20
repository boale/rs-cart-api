FROM node:14.17-alpine AS base

FROM base as dependencies
COPY package*.json ./
RUN npm install && npm cache clean --force

FROM dependencies AS build
COPY . .
RUN npm run build

USER node
EXPOSE 4000
ENTRYPOINT ["node", "dist/main.js"]