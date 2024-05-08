FROM node:20-alpine

RUN apk update && apk add --no-cache zsh git

RUN corepack prepare pnpm@$(yq e '.engines.pnpm' package.json)

RUN corepack enable