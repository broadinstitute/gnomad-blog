# gnomAD Blog

## Development

The gnomAD blog is built with [Gatsby](https://www.gatsbyjs.org/docs/).

### Local

Run a local development server. Requires [Node.js](https://nodejs.org/) and
[Yarn](https://yarnpkg.com/).

```
cd gnomad-blog
npm install -g gatsby-cli
yarn install
gatsby develop
```

### Docker

Run a development instance in a [Docker](https://docs.docker.com/) container using
[Docker Compose](https://docs.docker.com/compose/).

The gnomad-blog directory will be mounted in the container so that changes made on the host will be
picked up by the development server.

```
cd gnomad-blog
docker-compose up
```
