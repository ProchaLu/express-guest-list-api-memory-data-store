FROM node:lts-alpine

# 1. zsh is default shell on CodeSandbox - without it, the devbox fails to start
# with a "OCI runtime exec failed" error:
# ```
# OCI runtime exec failed: exec failed: unable to start container process: exec: '/bin/zsh': stat /bin/zsh: no such file or directory: unknown
# ```
#
# 2. Git is a dependency of zsh - without it, opening the terminal fails with a
# "command not found" error:
# ```
# "/root/.oh-my-zsh/tools/check_for_upgrade.sh:31: command not found: git"
# ```
#
# TODO: Switch to bash and remove the zsh packages in future if CodeSandbox adds
# a feature to configure the shell
# https://github.com/upleveled/express-guest-list-api-memory-data-store/pull/294#discussion_r1601759357
RUN apk update && apk add --no-cache zsh git

# Avoid prompts during package installation using Corepack with PNPM. This prevents the
# build process from being stopped by prompts such as:
# ```
# ! Corepack is about to download https://registry.npmjs.org/pnpm/-/pnpm-9.1.1.tgz
# ? Do you want to continue? [Y/n]
# ```
# https://github.com/nodejs/corepack/blob/main/README.md#corepack-install
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN corepack enable
