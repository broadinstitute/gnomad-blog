import { Link } from "gatsby";
import { kebabCase } from "lodash";
import PropTypes from "prop-types";
import React from "react";

const ArticleMeta = ({ post }) => {
  return (
    <div className="article-meta">
      <span className="article-date">{post.frontmatter.date}</span>

      {post.frontmatter.categories && post.frontmatter.categories.length && (
        <span className="article-categories">
          {" in "}
          {post.frontmatter.categories.reduce(
            (acc, category) => [
              ...acc,
              acc.length > 0 && " / ",
              <span key={category} className="article-category">
                <Link to={`/category/${kebabCase(category.toLowerCase())}/`}>{category}</Link>
              </span>,
            ],
            []
          )}
        </span>
      )}

      {post.frontmatter.authors && post.frontmatter.authors.length && (
        <div className="article-authors">
          {post.frontmatter.authors.reduce(
            (acc, author) => [
              ...acc,
              acc.length > 0 && ", ",
              <Link key={author} to={`/author/${kebabCase(author.toLowerCase())}/`}>
                {author}
              </Link>,
            ],
            []
          )}
        </div>
      )}
    </div>
  );
};

ArticleMeta.propTypes = {
  post: PropTypes.shape({
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string).isRequired,
      categories: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  }).isRequired,
};

export default ArticleMeta;