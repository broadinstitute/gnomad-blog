import { Link, graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import Layout from "../components/layout";

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout title="Home">
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <article className="article" key={node.fields.slug}>
            <header className="article-header">
              <h2 className="article-title">
                <Link to={node.fields.slug}>{title}</Link>
              </h2>
            </header>

            <div className="article-meta">
              <span className="article-date">{node.frontmatter.date}</span>

              {node.frontmatter.categories && node.frontmatter.categories.length && (
                <span className="article-categories">
                  {" in "}
                  {node.frontmatter.categories.reduce((acc, category) => [
                    ...acc,
                    acc.length && " / ",
                    <span key={category} className="article-category">
                      {category}
                    </span>,
                  ])}
                </span>
              )}

              <div className="article-authors">{node.frontmatter.authors.join(", ")}</div>
            </div>

            <section
              className="article-body article-excerpt"
              dangerouslySetInnerHTML={{
                __html: node.excerpt,
              }}
            />

            <footer className="article-footer">
              <Link to={node.fields.slug}>Continue reading</Link>
            </footer>
          </article>
        );
      })}
    </Layout>
  );
};

BlogIndex.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            excerpt: PropTypes.string.isRequired,
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }).isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              authors: PropTypes.arrayOf(PropTypes.string).isRequired,
              categories: PropTypes.arrayOf(PropTypes.string),
            }).isRequired,
          }).isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
