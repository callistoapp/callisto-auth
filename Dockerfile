FROM node

MAINTAINER Clement Mondion
WORKDIR /opt/app

RUN mkdir -p /opt/app && cd /opt/app
ADD . /opt/app

RUN mkdir -p /tmp/

ADD package-lock.json package.json /tmp/

RUN npm install nodemon -g

EXPOSE 3001 50051

RUN cd /tmp && npm i
