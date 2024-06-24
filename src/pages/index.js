import { Link, graphql, withPrefix } from "gatsby";
import { kebabCase } from "lodash";
import PropTypes from "prop-types";
import React from "react";

import ArticleList from "../components/list";
import Layout from "../components/layout";
import RSSIcon from "../components/rss-icon";

const BlogIndex = ({ data }) => {
  return (
    <Layout title="News">
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
            <h3>Subscribe</h3>
            <ul className="sidebar-list">
              <li>
                <a href={withPrefix("/rss.xml")}>
                  <RSSIcon /> RSS feed
                </a>
              </li>
              <li>
                <a href={withPrefix("/changelog.xml")}>
                  <RSSIcon /> Changelog RSS feed
                </a>
              </li>
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
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
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
      group(field: { frontmatter: { categories: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;
