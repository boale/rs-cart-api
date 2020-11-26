#FROM node:12.16.3 AS build
#COPY package*.json ./
#RUN npm install
#COPY * ./
#RUN npm run build
#
FROM node:12
WORKDIR app
#ENV NODE_ENV=production

ENV PORT=8080

COPY . ./

RUN npm install
RUN npm install pm2 -g
RUN npm run build
#COPY --from=build dist ./dist

USER node

EXPOSE 8080

CMD ["pm2-runtime", "dist/main.js"]
