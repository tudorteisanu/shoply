FROM nginx:alpine as runner

WORKDIR /var/www/html

COPY /var/www/html/dist/shoply ./

COPY codedeploy/nginx-site.conf /etc/nginx/conf.d/default.conf
