FROM node:14-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
WORKDIR /app
COPY ./ .
RUN npm run build

FROM node:14-alpine as production-stage
COPY --from=build-stage /app/dist ./dist

USER node
ENV PORT=8081
EXPOSE 8081

CMD [ "node", "dist/main.js" ]