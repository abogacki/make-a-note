FROM node:13.12.0-alpine

WORKDIR /client

ENV PATH /client/node_modules/.bin:$PATH

COPY ./package.json ./
COPY ./yarn.lock ./
RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./

CMD ["npm", "start"]