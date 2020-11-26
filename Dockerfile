# Base
FROM node:12-alpine as base

WORKDIR /app

# Dependencies
FROM base as dependencies

COPY package*.json ./
RUN npm install

# Build
FROM dependencies as build

WORKDIR /app
COPY . .
RUN npm run build

# Application
FROM node:12-alpine as application

COPY --from=build /app/package*.json ./
RUN npm install --only=production
RUN npm install pm2 -g
COPY --from=build /app/dist ./dist

USER node
ENV PORT=8080
EXPOSE 8080

CMD ["pm2-runtime", "dist/main.js"]
