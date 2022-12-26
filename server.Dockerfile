FROM node:14 as base

# WORKDIR /home/node/app

# Default environment (build + run time)
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
EXPOSE 8080

# App and dev dependencies
COPY ["package.json", "yarn.lock", "./"]
RUN yarn add patch-package -W
RUN yarn install --production=false


# App source
COPY . .

# Build step for production
FROM base
RUN yarn build

# Prune dev dependencies, modules ts files, yarn cache after build
RUN yarn install --production && \
    yarn autoclean --init && \
    echo *.ts >> .yarnclean && \
    yarn autoclean --force && \
    yarn cache clean

# run file
CMD ["node", "server/build/server/src"]