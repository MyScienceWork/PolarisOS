FROM node:7-slim

RUN npm install pm2 -g
RUN npm install flow-remove-types -g

RUN mkdir /app
WORKDIR /app

COPY app app/
COPY front front/
COPY gulpconfig gulpconfig/
COPY gulpfile.js .
COPY package.json .
COPY pm2.json .


ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

RUN npm run build

# Show current folder structure in logs
#RUN ls -al -R


CMD [ "pm2-docker", "start", "--env", "production", "pm2.json" ]
