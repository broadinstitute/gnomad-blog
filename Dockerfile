FROM node:lts

WORKDIR /blog
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "start"]
