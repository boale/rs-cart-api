FROM node:12.16.3-alpine
WORKDIR app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
USER node
EXPOSE 4000
ENTRYPOINT ["node", "dist/main.js"]