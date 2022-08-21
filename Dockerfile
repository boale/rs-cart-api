FROM node:14-alpine As base
WORKDIR /app
COPY package*.json ./
RUN npm install
WORKDIR /app
COPY . .
RUN npm run build

FROM node:14-alpine As application
COPY --from=base /app/package*.json ./
RUN npm install --only=production
COPY --from=base /app/dist ./dist

USER node
ENV PORT=8081
EXPOSE 8081

CMD [ "node", "dist/main.js" ]