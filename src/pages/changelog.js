import { Link, graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import Layout from "../components/layout";

const ChangelogPage = ({ data }) => {
  return (
    <Layout title="Changelog">
      <div className="article-list no-sidebar">
        <h1>Changelog</h1>
        <p>The changelog contains a record of all changes made to gnomAD, small or large.</p>
        <div className="article-list-inner">
          {data.allMarkdownRemark.edges.map(({ node }) => {
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
        </div>
      </div>
    </Layout>
  );
};

ChangelogPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ChangelogPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/changelog/" } }
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
          }
        }
      }
    }
  }
`;
