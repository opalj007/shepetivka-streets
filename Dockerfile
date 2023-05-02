FROM node:18.16.0 as build

WORKDIR /app

ADD ./assets /app/assets
ADD ./data /app/data
ADD ./src /app/src
ADD ./copy-db.js /app/copy-db.js
ADD ./package.json /app/package.json

RUN yarn install
RUN yarn build

FROM nginx

ADD ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/* /usr/share/nginx/html/

EXPOSE 8080

ENTRYPOINT ["nginx", "-g", "daemon off;"]
