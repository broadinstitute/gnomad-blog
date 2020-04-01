import { Link, graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import Layout from "../components/layout";

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark;

  return (
    <Layout title={post.frontmatter.title}>
      <article className="article">
        <header className="article-header">
          <h1 className="article-title">{post.frontmatter.title}</h1>
        </header>

        <div className="article-meta">
          <span className="article-date">{post.frontmatter.date}</span>

          {post.frontmatter.categories && post.frontmatter.categories.length && (
            <span className="article-categories">
              {" in "}
              {post.frontmatter.categories.reduce((acc, category) => [
                ...acc,
                acc.length && " / ",
                <span key={category} className="article-category">
                  {category}
                </span>,
              ])}
            </span>
          )}

          <div className="article-authors">{post.frontmatter.authors.join(", ")}</div>
        </div>

        <section
          className="article-body"
          dangerouslySetInnerHTML={{
            __html: post.html,
          }}
        />

        <nav className="article-nav">
          {pageContext.previous && (
            <div className="article-nav-item">
              Previous post:{" "}
              <Link id="article-nav-previous" to={pageContext.previous.fields.slug} rel="prev">
                {pageContext.previous.frontmatter.title}
              </Link>
            </div>
          )}
          {pageContext.next && (
            <div className="article-nav-item">
              Next post:{" "}
              <Link id="article-nav-next" to={pageContext.next.fields.slug} rel="next">
                {pageContext.next.frontmatter.title}
              </Link>
            </div>
          )}
        </nav>
      </article>
    </Layout>
  );
};

BlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      id: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        categories: PropTypes.arrayOf(PropTypes.string),
      }).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    previous: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }).isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }),
    next: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }).isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }),
  }).isRequired,
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        authors
        categories
      }
    }
  }
`;
