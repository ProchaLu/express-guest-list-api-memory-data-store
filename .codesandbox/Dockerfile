FROM node:20-alpine

RUN RUN apk add --no-cache libc6-compat zsh git yq --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community

RUN corepack prepare pnpm@$(yq e '.engines.pnpm' package.json)

RUN corepack enable