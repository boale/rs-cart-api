FROM node:12-alpine as build
RUN mkdir -p rs-cart-api
WORKDIR ./rs-cart-api
COPY src \
     package*.json \
     nest-cli.json \
     tsconfig*.json ./
RUN npm install
RUN npm run build
USER node
EXPOSE 4000
ENTRYPOINT ["node", "dist/main.js"]
