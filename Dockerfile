FROM node:7

RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y pdftk
RUN npm install pm2 -g

# support asian character
RUN apt-get install -y fonts-takao-mincho fonts-takao fonts-arphic-ukai fonts-arphic-uming fonts-ipafont-mincho fonts-ipafont-gothic fonts-unfonts-core

RUN mkdir /app
WORKDIR /app

COPY ./app app/
COPY ./front front/
COPY ./gulpconfig gulpconfig/
COPY ./gulpfile.js .
COPY ./package.json .
COPY ./pm2.json .


ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install

RUN npm run build-prod

# Show current folder structure in logs
#RUN ls -l


CMD [ "pm2-docker", "start", "pm2.json", "--env", "production" ]
