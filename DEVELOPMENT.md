# Development

The gnomAD blog is built with [Gatsby](https://www.gatsbyjs.org/docs/).

## Set up environment

[Install pre-commit](https://pre-commit.com/#install) and hooks (`pre-commit install`).

To run a development server locally, install [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/). Install dependencies with `yarn install`.

Alternatively, a development server can be run in a [Docker](https://docs.docker.com/) container.

## Run development server

Run a local development server with:

```
yarn start
```

Or in Docker with [Docker Compose](https://docs.docker.com/compose/):

```
docker-compose up
```

The gnomad-blog directory will be mounted in the container so that changes made on the host will be picked up by the development server.

## Adding a new post

Create a Markdown file in the `content/posts` directory. By convention, these files are named based on the publication date and the title: `YYYY-MM-title-slug.md`.

The first part of the file should contain [YAML frontmatter](https://www.gatsbyjs.com/docs/adding-markdown-pages/#frontmatter-for-metadata-in-markdown-files) specifying the post's title and publication date, as well as optional lists of categories and authors.

For example:

```yaml
---
title: Adding a new post
date: "2020-09-10" # YYYY-MM-DD format, quotes are important
categories:
  - Documentation
  - Examples
authors:
  - Alice
  - Bob
---

```

The rest of the file should contain the post content written in [Markdown](https://www.markdownguide.org/basic-syntax/).

Alternatively, use Netlify CMS (at http://localhost:8000/admin/) to add/edit content (see instructions in [CONTRIBUTING.md](./CONTRIBUTING.md)). In development, Netlify CMS uses a local backend which writes directly to the file system instead of going through GitHub.
