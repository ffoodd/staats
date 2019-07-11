FROM node:12-alpine

COPY . /app
WORKDIR /app

RUN npm install

ENTRYPOINT ["node", "cli.js"]
CMD ["--help"]
