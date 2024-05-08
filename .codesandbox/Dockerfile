FROM node:20-alpine

RUN apk update && apk add --no-cache zsh git yq --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community

RUN corepack enable && corepack prepare pnpm@$(yq e '.engines.pnpm' package.json) -y
