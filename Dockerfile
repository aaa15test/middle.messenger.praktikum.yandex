FROM node:18
WORKDIR /src
ADD /src
RUN npm install 
ADD package.json /package.json
EXPOSE 3000
CMD npm run start
