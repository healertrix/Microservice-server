FROM node:14
WORKDIR /usr/src/content

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm","start"]