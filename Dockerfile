# FROM node:16-alpine3.15 

# COPY . ./
# WORKDIR /app
# RUN npm i 
# RUN npm run build
# USER node
# EXPOSE 4000
# ENTRYPOINT ["node", "dist/main.js"]


FROM node:16.13.1-alpine as base

WORKDIR /app

COPY package*.json ./
RUN npm install

WORKDIR /app
COPY . .
RUN npm run build && npm prune --production

FROM node:16.13.1-alpine as application

COPY --from=base /app/package*.json ./
RUN npm install --only=production
RUN npm install pm2 -g
COPY --from=base /app/dist ./dist

USER node
ENV PORT=8080
EXPOSE 8080

CMD [ "pm2-runtime", "dist/main.js" ]





# # # 103 mb
# FROM node:16-alpine3.15 AS base

# # Build layer
# FROM base as build
# WORKDIR /build
# COPY package*.json ./
# RUN npm i --force
# RUN npm audit fix --force
# COPY . .
# RUN npm run build && npm prune --production

# # Release layer
# FROM base
# WORKDIR ../app
# COPY package*.json ./
# COPY --from=build /build/node_modules ./node_modules
# COPY --from=build /build/dist ./dist
# EXPOSE 4000
# CMD [ "npm", "run", "start:prod" ]