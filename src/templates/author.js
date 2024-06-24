import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import ArticleList from "../components/list";
import Layout from "../components/layout";

const AuthorPage = ({ pageContext, data }) => {
  const title = `Posts by ${pageContext.author}`;
  return (
    <Layout title={title}>
      <ArticleList heading={title} posts={data.allMarkdownRemark.edges} />
    </Layout>
  );
};

AuthorPage.propTypes = {
  pageContext: PropTypes.shape({
    author: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
  }).isRequired,
};

export default AuthorPage;

export const pageQuery = graphql`
  query ($author: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { authors: { in: [$author] } } }
      sort: [{ frontmatter: { date: DESC } }, { frontmatter: { order: ASC } }]
    ) {
      edges {
        node {
          excerpt(format: HTML)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            authors
            categories
          }
        }
      }
    }
  }
`;
