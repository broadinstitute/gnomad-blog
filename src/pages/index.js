import { Link, graphql } from "gatsby";
import { kebabCase } from "lodash";
import PropTypes from "prop-types";
import React from "react";

import ArticleList from "../components/list";
import Layout from "../components/layout";

const BlogIndex = ({ data }) => {
  return (
    <Layout title="Home">
      <ArticleList
        posts={data.allMarkdownRemark.edges}
        extraSidebarContent={
          <>
            <h3>Categories</h3>
            <ul className="sidebar-list">
              {data.allMarkdownRemark.group
                .sort((groupA, groupB) => groupB.totalCount - groupA.totalCount)
                .map(({ fieldValue: category, totalCount: numPosts }) => (
                  <li key={category}>
                    <Link to={`/category/${kebabCase(category.toLowerCase())}/`}>{category}</Link>
                    <div className="item-description">{numPosts} posts</div>
                  </li>
                ))}
            </ul>
          </>
        }
      />
    </Layout>
  );
};

BlogIndex.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object).isRequired,
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date, frontmatter___order], order: DESC }) {
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
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`;
