FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN yarn install --production
COPY . .
RUN yarn build
EXPOSE 3001
RUN chown -R node /usr/src/app
USER node
CMD ["yarn", "start"]
