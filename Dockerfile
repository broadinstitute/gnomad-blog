FROM node:12

RUN npm install -g gatsby-cli

WORKDIR /blog
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile

WORKDIR /blog/src
COPY . .

CMD ["gatsby", "develop", "--host", "0.0.0.0"]
