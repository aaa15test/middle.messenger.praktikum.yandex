FROM node:18.0.0
RUN apt update && apt install -y nodejs && apt install -y npm
WORKDIR /var/www
COPY ./server.js server.js
EXPOSE 3000
ENTRYPOINT ["tail"]
CMD ["-f","/dev/null"]
