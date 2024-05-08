# Use the node:20-alpine base image
FROM node:20-alpine

# Install zsh
RUN apk update && apk add --no-cache zsh

# Install the latest version of pnpm
RUN npm install -g pnpm

# Set zsh as the default shell
SHELL ["/bin/zsh", "-c"]
