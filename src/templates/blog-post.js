import { Link, graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import BlogPost from "../components/blog-post";
import Layout from "../components/layout";

const BlogPostPage = ({ data, pageContext }) => {
  const post = data.markdownRemark;

  return (
    <Layout title={post.frontmatter.title}>
      <BlogPost postMetadata={post.frontmatter}>
        <div
          dangerouslySetInnerHTML={{
            __html: post.html,
          }}
        />
      </BlogPost>

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
    </Layout>
  );
};

BlogPostPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      id: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        authors: PropTypes.arrayOf(PropTypes.string),
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

export default BlogPostPage;

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
