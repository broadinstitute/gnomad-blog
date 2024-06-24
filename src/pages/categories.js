import { Link, graphql } from "gatsby";
import { kebabCase } from "lodash";
import PropTypes from "prop-types";
import React from "react";

import Layout from "../components/layout";

const Categories = ({ data }) => {
  return (
    <Layout title="Categories">
      <div className="article-list">
        <h1>Categories</h1>
        <ul className="category-list">
          {data.allMarkdownRemark.group
            .sort((groupA, groupB) => groupB.totalCount - groupA.totalCount)
            .map(({ fieldValue: category, totalCount: numPosts }) => (
              <li key={category}>
                <Link to={`/category/${kebabCase(category.toLowerCase())}/`}>{category}</Link>
                <br />
                {numPosts} posts
              </li>
            ))}
        </ul>
      </div>
    </Layout>
  );
};

Categories.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Categories;

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      group(field: { frontmatter: { categories: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;
