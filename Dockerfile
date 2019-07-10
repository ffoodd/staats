FROM node:12-alpine

COPY . /app
WORKDIR /app

RUN npm install

ENTRYPOINT ["npm", "run", "start"]
