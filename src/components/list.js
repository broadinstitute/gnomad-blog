import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const ArticleList = ({ posts }) => {
  return (
    <div className="article-list">
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

              {node.frontmatter.authors && node.frontmatter.authors.length && (
                <div className="article-authors">{node.frontmatter.authors.join(", ")}</div>
              )}
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
  );
};

ArticleList.propTypes = {
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

export default ArticleList;
