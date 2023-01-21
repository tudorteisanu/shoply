FROM nginx:alpine as runner

WORKDIR /var/www/html

COPY dist/shoply ./

COPY codedeploy/nginx-site.conf /etc/nginx/conf.d/default.conf
