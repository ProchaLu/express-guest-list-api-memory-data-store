FROM node:20-alpine

RUN apk update && apk add --no-cache zsh git

RUN npm install -g pnpm

SHELL ["/bin/zsh", "-c"]
