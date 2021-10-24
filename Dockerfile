# ---- Base Node image ----
FROM node:12-alpine AS base
WORKDIR /app

# ---- Dependencies ----
FROM base AS dependencies
COPY package*.json ./
RUN npm install && npm cache clean --force

# ---- Copy Fiels/Build ----
FROM dependencies AS build
COPY tsconfig*.json /app/
WORKDIR /app
COPY src /app/
RUN npm run build

# ---- Release with Alpine ----
FROM node:12-alpine
WORKDIR /app
COPY --from=dependencies /app/package*.json ./
COPY --from=build /app/tsconfig*.json ./
ENV NODE_ENV production
RUN npm install --only=production && npm cache clean --force
COPY --from=build /app/dist ./dist/
USER node
EXPOSE 4000
ENTRYPOINT ["npm", "run", "start"]
