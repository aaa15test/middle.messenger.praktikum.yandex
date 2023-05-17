FROM node:18
WORKDIR /var/www
COPY . .
RUN npm install 
COPY ./server.js server.js
EXPOSE 3000
CMD npm run start
