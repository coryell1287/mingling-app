FROM node:14.15 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build



FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY ./shared/config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
