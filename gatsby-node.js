/* eslint-env node */
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const _ = require("lodash");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
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
          categories: distinct(field: frontmatter___categories)
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges;
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
  const categories = result.data.allMarkdownRemark.categories;
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
