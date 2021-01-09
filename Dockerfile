FROM ubuntu

RUN apt-get update -y

RUN apt-get install -y nano wget curl dialog net-tools

RUN apt-get install -y nginx

COPY $PWD/dist/ /usr/share/nginx/html/

COPY $PWD/dist/ /var/www/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
