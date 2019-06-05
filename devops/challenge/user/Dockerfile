FROM node:10.15.3-alpine

EXPOSE 8080

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY .eslintrc.json .eslintrc.json
COPY test test
COPY config config
COPY src src

CMD ["node", "src/index.js"]