FROM node:12

WORKDIR /blog
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "start", "--host", "0.0.0.0"]
