FROM node:lts-alpine

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 8888

CMD [ "node", "app.js" ]