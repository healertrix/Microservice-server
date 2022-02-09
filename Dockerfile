FROM node:14
WORKDIR "/src/Microservice"

COPY package*.json ./
RUN npm install

COPY . .

WORKDIR "/src/Microservice/Content-api"
RUN npm install



WORKDIR "/src/Microservice/User-api"
RUN npm install


WORKDIR "/src/Microservice/User-interactin-api"
RUN npm install



WORKDIR "/src/Microservice"
CMD ["npm","start"]


