import { Link } from "gatsby";
import { kebabCase } from "lodash";
import PropTypes from "prop-types";
import React from "react";

const ArticleMeta = ({ postMetadata }) => {
  return (
    <div className="article-meta">
      <span className="article-date">{postMetadata.date}</span>

      {postMetadata.categories && postMetadata.categories.length > 0 && (
        <span className="article-categories">
          {" in "}
          {postMetadata.categories.reduce(
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

      {postMetadata.authors && postMetadata.authors.length > 0 && (
        <div className="article-authors">
          {postMetadata.authors.reduce(
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
  postMetadata: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    categories: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ArticleMeta;
