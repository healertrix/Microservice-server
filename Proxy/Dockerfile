FROM node:14

WORKDIR /src

#Install app dependencies
COPY package*.json ./
RUN npm install

#Bundle app source
COPY . .

CMD ["npm","start"]
