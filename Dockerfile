FROM node:14.18.1-alpine as dev
WORKDIR ./
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build

FROM node:14.18.1-alpine as prod
ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}
WORKDIR ./
COPY --from=dev package*.json ./
RUN npm install --only=prod
COPY . .
COPY --from=dev ./dist ./dist
USER node
EXPOSE 4000
CMD ["node", "dist/main.js"]