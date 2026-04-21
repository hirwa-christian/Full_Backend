ARG NODE_VERSION=23.11.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY . .

EXPOSE 7780

RUN yarn cache clean

RUN yarn install

CMD [ "yarn", "start" ]
