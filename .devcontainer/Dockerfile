# CodeSandbox supports debian & ubuntu based images
FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04

# Install system dependencies
RUN apt update -y && apt install -y curl htop

# Install the latest version of pnpm
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -