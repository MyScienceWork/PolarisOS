# Create the base image with all required components
FROM node:12.20.2-buster AS base

RUN apt-get update

# Apply security patches
RUN grep security /etc/apt/sources.list | tee /etc/apt/security.sources.list \
    && apt-get upgrade -y -o Dir::Etc::SourceList=/etc/apt/security.sources.list

# Remove unused unsecure packages
RUN apt-get remove -y mercurial mercurial-common

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


# Build the application using all required dependencies
# The usage of flow and gulp means dev dependencies are needed for building
FROM base AS builder

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install

RUN npm run build-prod


# Install only production dependencies and copy the build
FROM base

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --only=prod
# GIT needed to install dependencies identified with a GIT repo
RUN apt-get remove -y git

RUN npm run clean-public
COPY --from=builder /app/public /app/public
COPY --from=builder /app/build /app/build

# Show current folder structure in logs
CMD [ "pm2-docker", "start", "pm2.json", "--env", "production" ]
