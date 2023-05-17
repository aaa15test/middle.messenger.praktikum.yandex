FROM node:18
WORKDIR /
ADD . /
ADD package.json /package.json
RUN npm install
EXPOSE 3000
CMD npm run start
