# Use the node:20-alpine base image
FROM node:20-alpine

# Install zsh and Git
RUN apk update && apk add --no-cache zsh git

# Install the latest version of pnpm
RUN corepack enable
RUN corepack prepare pnpm@latest --activate



# Set zsh as the default shell
SHELL ["/bin/zsh", "-c"]
