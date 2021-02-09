# Development

The gnomAD blog is built with [Gatsby](https://www.gatsbyjs.org/docs/).

Run a local development server with:

```
yarn install
yarn start
```

This requires [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/).

Alternatively, the development server can be run in a [Docker](https://docs.docker.com/) container with [Docker Compose](https://docs.docker.com/compose/):

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
date: '2020-09-10' # YYYY-MM-DD format, quotes are important
categories:
  - Documentation
  - Examples
authors:
  - Alice
  - Bob
---
```

The rest of the file should contain the post content written in [Markdown](https://www.markdownguide.org/basic-syntax/).

