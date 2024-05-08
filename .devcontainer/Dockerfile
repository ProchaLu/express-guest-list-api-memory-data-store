# Use an official Ubuntu 22.04 LTS as a base image
FROM ubuntu:22.04

# Set the working directory
WORKDIR /usr/src/app

# Install system dependencies including curl, htop, and zsh
RUN apt-get update && apt-get install -y \
    curl \
    htop \
    zsh \
    && rm -rf /var/lib/apt/lists/*

# Set the SHELL environment variable to '/bin/bash' explicitly
SHELL ["/bin/bash", "-c"]

# Install the latest version of pnpm
RUN curl -fsSL https://get.pnpm.io/install.sh | SHELL=/bin/bash sh -

# Start zsh by default
CMD ["zsh"]
