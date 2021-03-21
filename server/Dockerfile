FROM node:13.12.0-alpine

RUN mkdir -p /server
WORKDIR /server

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./

CMD ["npm", "start"]