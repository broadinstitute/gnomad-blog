import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import ArticleMeta from "./article-meta";

const ArticleList = ({ heading, posts, extraSidebarContent }) => {
  return (
    <div className="article-list">
      {heading && <h1>{heading}</h1>}
      <h1>News</h1>
      <p>
        The news page highlights new features, versions, or other major announcements. See our{" "}
        <Link to="/changelog">changelog</Link> for all changes to gnomAD, including minor ones.
      </p>
      <br />
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

              <ArticleMeta postMetadata={node.frontmatter} />

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
          <h3>Latest posts</h3>
          <ol className="sidebar-list">
            {posts.slice(0, 5).map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              return (
                <li key={node.fields.slug}>
                  <Link to={node.fields.slug}>{title}</Link>
                  <div className="item-description">{node.frontmatter.date}</div>
                </li>
              );
            })}
          </ol>
          {extraSidebarContent}
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
  extraSidebarContent: PropTypes.node,
};

ArticleList.defaultProps = {
  heading: undefined,
  extraSidebarContent: undefined,
};

export default ArticleList;
