# Contributing to the gnomAD blog

The gnomAD blog is built with [Gatsby](https://www.gatsbyjs.org/docs/).

Blog content can be edited either in a browser using [Netlify CMS](https://www.netlifycms.org/) or by running a local
instance of the Gatsby development server.

## Local development server

Run a local development server with:

```
yarn install
yarn start
```

This requires [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/).

Alternatively, the development server can be run in a [Docker](https://docs.docker.com/) container with
[Docker Compose](https://docs.docker.com/compose/):

```
docker-compose up
```

The gnomad-blog directory will be mounted in the container so that changes made on the host will be picked up by the
development server.

### Adding a new post

Create a Markdown file in the `content/posts` directory. By convention, these files are named based on the publication
date and the title: `YYYY-MM-title-slug.md`.

The first part of the file should contain [YAML frontmatter](https://www.gatsbyjs.com/docs/adding-markdown-pages/#frontmatter-for-metadata-in-markdown-files)
specifying the post's title and publication date, as well as optional lists of categories and authors.

For example:

```yaml
---
title: Adding a new post
date: 2020-09-10 # YYYY-MM-DD format
categories:
  - Documentation
  - Examples
authors:
  - Alice
  - Bob
---
```

The rest of the file should contain the post content written in [Markdown](https://www.markdownguide.org/basic-syntax/).

To control what is shown "above the fold" in the list of posts on the home page, add a line with an HTML comment:

```html
<!-- end_excerpt -->
```

Any content after that comment will only be visible by clicking the "Continue reading" link to view the full post.
