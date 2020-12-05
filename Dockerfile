FROM node:12-alpine as BUILD_IMAGE
# RUN mkdir -p rs-cart-api
WORKDIR ./rs-cart-api
COPY src \
     package*.json \
     nest-cli.json \
     tsconfig*.json ./
RUN npm install
RUN npm run build
RUN npm prune --production

FROM node:12-alpine as RUN_IMAGE
WORKDIR ./rs-cart-api
COPY --from=BUILD_IMAGE ./rs-cart-api/dist ./dist
COPY --from=BUILD_IMAGE ./rs-cart-api/node_modules ./node_modules
EXPOSE 4000
ENTRYPOINT ["node", "dist/main.js"]
