import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import ArticleList from "../components/list";
import Layout from "../components/layout";

const CategoryPage = ({ pageContext, data }) => {
  return (
    <Layout title={pageContext.category}>
      <ArticleList heading={pageContext.category} posts={data.allMarkdownRemark.edges} />
    </Layout>
  );
};

CategoryPage.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
  }).isRequired,
};

export default CategoryPage;

export const pageQuery = graphql`
  query ($category: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { categories: { in: [$category] } } }
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
