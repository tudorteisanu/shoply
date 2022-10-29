FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /var/www/html

COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile


FROM node:16-alpine AS builder
WORKDIR /var/www/html
COPY --from=deps /var/www/html/node_modules ./node_modules
COPY . .
RUN yarn build

FROM nginx:alpine as runner

WORKDIR /var/www/html

COPY --from=builder /var/www/html/dist/shoply ./

COPY codedeploy/nginx-site.conf /etc/nginx/conf.d/default.conf
