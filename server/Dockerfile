FROM node:13.12.0-alpine

RUN mkdir -p /server
WORKDIR /server

ENV PATH /server/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./

CMD ["npm", "start"]