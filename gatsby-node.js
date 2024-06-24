/* eslint-env node */
const fs = require("fs");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const _ = require("lodash");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const postsResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/posts/" } }
          sort: [{ frontmatter: { date: DESC } }, { frontmatter: { order: ASC } }]
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
          categories: distinct(field: { frontmatter: { categories: SELECT } })
          authors: distinct(field: { frontmatter: { authors: SELECT } })
        }
      }
    `
  );

  if (postsResult.errors) {
    throw postsResult.errors;
  }

  // Create blog posts pages.
  const posts = postsResult.data.allMarkdownRemark.edges;
  const blogPostTemplate = path.resolve("./src/templates/blog-post.js");
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });

  // Create category pages
  const categories = postsResult.data.allMarkdownRemark.categories;
  const categoryTemplate = path.resolve("./src/templates/category.js");
  categories.forEach((category) => {
    createPage({
      path: `/category/${_.kebabCase(category.toLowerCase())}/`,
      component: categoryTemplate,
      context: {
        category,
      },
    });
  });

  // Create author pages
  const authors = postsResult.data.allMarkdownRemark.authors;
  const authorTemplate = path.resolve("./src/templates/author.js");
  authors.forEach((author) => {
    createPage({
      path: `/author/${_.kebabCase(author.toLowerCase())}/`,
      component: authorTemplate,
      context: {
        author,
      },
    });
  });

  const changelogResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/changelog/" } }
          sort: [{ frontmatter: { date: DESC } }, { frontmatter: { order: ASC } }]
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
          categories: distinct(field: { frontmatter: { categories: SELECT } })
          authors: distinct(field: { frontmatter: { authors: SELECT } })
        }
      }
    `
  );

  if (changelogResult.errors) {
    throw changelogResult.errors;
  }

  const changelogEntries = changelogResult.data.allMarkdownRemark.edges;
  changelogEntries.forEach((post, index) => {
    const previous =
      index === changelogEntries.length - 1 ? null : changelogEntries[index + 1].node;
    const next = index === 0 ? null : changelogEntries[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: "slug",
      node,
      value,
    });
  }
};

exports.onCreateDevServer = async ({ app }) => {
  const configPath = path.join(__dirname, "public", "admin", "config.yml");
  if (fs.existsSync(configPath)) {
    fs.unlinkSync(configPath);
  }

  app.get("/admin/config.yml", (req, res, next) => {
    fs.readFile("netlify-cms-config.yml", { encoding: "utf8" }, (err, data) => {
      if (err) {
        next(err);
      }
      res.setHeader("content-type", "text/plain");
      res.send(data + "\n\nlocal_backend: true\n");
    });
  });
};

exports.onPostBuild = async () => {
  await fs.promises.mkdir(path.join(__dirname, "public", "admin"), { recursive: true });
  await fs.promises.copyFile(
    "netlify-cms-config.yml",
    path.join(__dirname, "public", "admin", "config.yml")
  );
};
