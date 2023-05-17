FROM node:18
WORKDIR /src
ADD . /src
ADD package.json /package.json
RUN npm install
EXPOSE 3000
CMD npm run start
