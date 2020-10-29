import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import ArticleMeta from "./article-meta";

const ArticleList = ({ heading, posts }) => {
  return (
    <div className="article-list">
      {heading && <h1>{heading}</h1>}
      <div className="article-list-inner">
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <article className="article" key={node.fields.slug}>
              <header className="article-header">
                <h2 className="article-title">
                  <Link to={node.fields.slug}>{title}</Link>
                </h2>
              </header>

              <ArticleMeta post={node} />

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

        <aside className="sidebar">
          <h3>Recent posts</h3>
          <ol className="recent-posts-list">
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              return (
                <li key={node.fields.slug}>
                  <Link to={node.fields.slug}>{title}</Link>
                  <div className="article-date">{node.frontmatter.date}</div>
                </li>
              );
            })}
          </ol>
        </aside>
      </div>
    </div>
  );
};

ArticleList.propTypes = {
  heading: PropTypes.string,
  posts: PropTypes.arrayOf(
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
};

ArticleList.defaultProps = {
  heading: undefined,
};

export default ArticleList;