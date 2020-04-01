/* eslint-env node */
module.exports = {
  pathPrefix: "/blog",
  siteMetadata: {
    title: "gnomAD",
    siteUrl: "https://gnomad.broadinstitute.org",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/posts`,
        name: "posts",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        excerpt_separator: "<!-- end_excerpt -->",
        plugins: [
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1rem",
            },
          },
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-netlify-cms",
  ],
};
