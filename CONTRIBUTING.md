# Contributing to the gnomAD blog

Login to Netlify CMS at https://gnomad.broadinstitute.org/blog/admin/. To make changes to the blog, you must have write access to the [gnomad-blog GitHub repository](https://github.com/broadinstitute/gnomad-blog)

## Adding a new post

1. Select the "Contents" tab and click the "New Post" button.

2. Set the post's title and publication date. Add authors and categories.

3. Write the body of the post using either the rich text editor or [Markdown](https://www.markdownguide.org/basic-syntax/).

   - Click the "Toggle preview" button at the top right to show a preview of the post.

   - To control what is shown "above the fold" in the list of posts on the home page, use Markdown mode to add a line containing an HTML comment:

      ```html
      <!-- end_excerpt -->
      ```

      Any content after that comment will only be visible by clicking the "Continue reading" link to view the full post.

4. Click the "Save" button to save a draft of the post. Saving a draft opens a pull request on the [gnomad-blog GitHub repository](https://github.com/broadinstitute/gnomad-blog) GitHub with the new post. Further edits can be made in the CMS (the new post will appear in the Drafts column on the Workflow tab). This will add commits to the PR's branch. Alternatively, the branch can be edited on GitHub or pulled and edited locally.

   - When the PR is opened, a preview site containing its changes will automatically be deployed to `https://gnomad.broadinstitute.org/blog/preview/<PR_NUMBER>`. This may take a few minutes. Once it is done, a "View Preview" link will appear in the top bar of the CMS next to the "Set status" and "Publish" buttons. To see progress generating the preview site, look at the PR's status checks on GitHub.

5. When the post is ready, click the "Publish" button in Netlify CMS. This merges the PR. Alternatively, the PR can be merged on GitHub. Changes committed to the `main` branch will automatically be deployed to `https://gnomad.broadinstitute.org/blog/`.

## Local development

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

### Adding a new post

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

## Images

Currently, all images used in blog posts are uploaded to the `gnomad-blog-assets` storage bucket and referenced from there.

For example,

```html
<figure>
   <img src="https://storage.googleapis.com/gnomad-blog-assets/2017/02/the-genome-aggregation-database/exacv2_barplot_cut.png" />
</figure>
```
