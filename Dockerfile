FROM node:lts-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install && npm run build

CMD ["npm", "run", "start:dev"]
